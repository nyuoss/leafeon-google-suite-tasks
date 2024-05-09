import React, { useState } from 'react'

import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Login from './login';
import Logout from './logout';
import { useGoogleDocs } from '../GoogleDocsContext';




function Navbar() {
    const { comments, accessToken } = useGoogleDocs();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  // State to track login status


    const onSuccessLogin = (res) => {
        console.log("LOGIN SUCCESS! Current user :", res.profileObj);
        console.log("badaboom");
        setIsUserLoggedIn(true);  // Set login status to true on successful login

    };

    const onSuccessLogout = (res) => {
        console.log("Log out successfull");
        console.log("badaboom");
        setIsUserLoggedIn(false);  // Set login status to true on successful login

    };
  return (
    <div className='navbar p-8 border mb-12 flex justify-between items-center'> {/* Flexbox container */}
        {/* Logo centered in the navbar */}
        <div className='absolute left-5 pl-5'>
            <h1 className='font-extralight text-2xl'>Leafeon Google Task Aggregator</h1>
        </div>

        <div className='absolute right-10 flex gap-4'>
            {!isUserLoggedIn && (<div>
                <Login onSuccess={onSuccessLogin} />
            </div>)}
            {isUserLoggedIn  && (<div>
                <Logout onSuccess={onSuccessLogout} />
            </div>)}
        </div>
        
       
        {/* <img src="nike.svg" alt="Logo" className="logo" style={{height:50}}/> Add your logo image here */}
    </div>
  )
}  



export default Navbar