// GoogleDocsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = '931024815427-72meiq3uivuuolfukb3jvikvhhqlr574.apps.googleusercontent.com';

const GoogleDocsContext = createContext();

export const useGoogleDocs = () => {
  return useContext(GoogleDocsContext);
};

export const GoogleDocsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [accessToken, setAccessToken] = useState('');

  const moveCommentToTasks = async (commentIndex) => {
    const updatedComments = [...comments];
    const movedComment = updatedComments.splice(commentIndex, 1)[0];
    
    // Create title for the new task
    const title = `Tagged by ${movedComment.author} on ${movedComment.fileName}`;
  
    // Create new task object with title and note from the moved comment
    const newTask = {
      title: title,
      note: movedComment.content
      // Add any other properties you need for the task
    };
  
    // Update tasks state to include the new task optimistically
    setTasks(prevTasks => [...prevTasks, newTask]);
  
    // Update comments state to remove the moved comment
    setComments(updatedComments);
  
    // Prepare request body for creating the task
    const requestBody = {
      title: newTask.title,
      notes: newTask.note,
      // Add any other properties you need for the task
    };
  
    try {
      // Make API request to create the task
      const response = await fetch("https://www.googleapis.com/tasks/v1/lists/@default/tasks", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      console.log("Task created successfully!");
  
    } catch (error) {
      console.error("Error creating task:", error);
      // If there's an error, revert the changes made optimistically
      setTasks(prevTasks => prevTasks.filter(task => task !== newTask));
      setComments(prevComments => [...prevComments, movedComment]);
    }
  };

  
  const loadComments = (accessToken) => {
    let allComments = []; // Accumulate comments in this array
  
    fetch("https://www.googleapis.com/drive/v3/files?access_token=" + accessToken)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        const googleDocsFiles = data.files.filter(file => file.mimeType === "application/vnd.google-apps.document");
  
        // Map each file to a promise that fetches its comments
        const commentPromises = googleDocsFiles.map(file => {
          const fileId = file.id;
          const apiUrl = `https://www.googleapis.com/drive/v2/files/${fileId}/comments?access_token=${accessToken}`;
          
          return fetch(apiUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(commentData => {
              return commentData.items.map(comment => ({
                content: comment.content,
                author: comment.author.displayName,
                fileName: file.name
              }));
            })
            .catch(error => {
              console.error("Error fetching comments for file:", file.name, error);
              return []; // Return an empty array if there's an error
            });
        });
  
        // Resolve all promises and concatenate the results into one array
        return Promise.all(commentPromises);
      })
      .then(commentsArrays => {
        allComments = commentsArrays.flat(); // Flatten the array of arrays
        setComments(allComments); // Set the state once with all comments
      })
      .catch(error => {
        console.error("Error listing files:", error);
      });
  };

  const loadTasks = (accessToken) => {
    fetch("https://www.googleapis.com/tasks/v1/lists/@default/tasks", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Tasks Response:", data);
        const allTasks = data.items.map(task => ({
          title: task.title,
          note: task.notes,
          
          // Add any other properties you need
        }));
        setTasks(allTasks);
      })
      .catch(error => {
        console.error("Error listing tasks:", error);
      });
  };

  

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'https://www.googleapis.com/auth/documents.readonly https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/drive'
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const user = authInstance.currentUser.get();
          const authResponse = user.getAuthResponse();
          setAccessToken(authResponse.access_token);
          loadComments(authResponse.access_token);
          loadTasks(authResponse.access_token);
        } else {
          console.error('User is not signed in.');
        }
      }).catch(error => {
        console.error('Error initializing Google API client:', error);
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <GoogleDocsContext.Provider value={{ comments, accessToken, tasks, moveCommentToTasks }}>
      {children}
    </GoogleDocsContext.Provider>
  );
};
