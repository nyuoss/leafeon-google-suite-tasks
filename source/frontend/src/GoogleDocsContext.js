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
  const [email, setEmail] = useState('');

  // Function to update email
  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    console.log("Set Email From: ", newEmail, " to: ", email)
  };

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



  const fetchComments = async (accessToken, email) => {
    try {
      console.log("Access Token1:", accessToken);
      console.log("Email:", email);

      const response = await fetch(`https://leafeon-2-8bd3e618e164.herokuapp.com/api/comments?access_token=${accessToken}&email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Data: ", data)
      setComments(data.comments.map(comment => ({
        content: comment.content,
        author: comment.author,
        fileName: comment.fileName
      })));
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const fetchTasks = async (accessToken) => {
    try {
      console.log("Access Token2:", accessToken);

      const response = await fetch(`https://leafeon-2-8bd3e618e164.herokuapp.com/api/tasks?access_token=${accessToken}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("TaskData: ", data)
      setTasks(data.tasks.map(task => ({
        title: task.title,
        note: task.note
      })));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    }
  };

  // useEffect(() => {
  //   const fetchInitialData = async () => {
  //     await fetchComments();
  //     await fetchTasks();
  //   };
  //   if (accessToken) {
  //     fetchInitialData();
  //   }
  // }, [accessToken]);



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
          const userEmail = user.getBasicProfile().getEmail();
          setEmail(userEmail)

          console.log("Access Token3:", accessToken); // Add this line before fetch calls
          console.log("Email Check:", userEmail, " and ", email); // Add this line before fetch calls

          fetchComments(authResponse.access_token, userEmail); // should be email, but for some reason not updating
          fetchTasks(authResponse.access_token);
          // loadComments(authResponse.access_token);
          // loadTasks(authResponse.access_token);
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
    <GoogleDocsContext.Provider value={{ comments, accessToken, tasks, moveCommentToTasks, email, updateEmail }}>
      {children}
    </GoogleDocsContext.Provider>
  );
};
