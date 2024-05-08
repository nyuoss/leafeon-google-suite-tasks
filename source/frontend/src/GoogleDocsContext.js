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

  const moveCommentToTasks = (commentIndex) => {
    const updatedComments = [...comments];
    const movedComment = updatedComments.splice(commentIndex, 1)[0];
    setComments(updatedComments);
    setTasks(prevTasks => [...prevTasks, movedComment]);
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
  

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'https://www.googleapis.com/auth/documents.readonly'
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const user = authInstance.currentUser.get();
          const authResponse = user.getAuthResponse();
          setAccessToken(authResponse.access_token);
          loadComments(authResponse.access_token);
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
