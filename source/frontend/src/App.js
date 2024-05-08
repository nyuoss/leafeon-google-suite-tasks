import React from 'react';
import { useGoogleDocs } from './GoogleDocsContext';
import Login from './components/login';
import Logout from './components/logout';
import Navbar from './components/Navbar';
import Comments from './components/Comments';
import Tasks from './components/Tasks';


const App = () => {
  const { comments, onSuccessLogin } = useGoogleDocs();

  return (
    <div className='App'>
      <Navbar/>
      <div className="p-4">
          <div className="flex  p-4 gap-8 ">
            <div className="w-1/2 border rounded-xl p-4 "  style={{backgroundColor:'#CAD9F6'}}> 
              <Comments/>
             </div>
            <div className="w-1/2 border rounded-xl p-4" style={{backgroundColor:'#FFE4C2'}}> 
            <Tasks/>
             </div>
          </div>
        </div>
      </div>
      
  );
};

export default App;
