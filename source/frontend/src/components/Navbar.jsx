import React, { useState } from 'react'

import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Login from './login';
import Logout from './logout';
import { useGoogleDocs } from '../GoogleDocsContext';
import placeholderImageUrl from './placeholder.png'; // Adjust the path if necessary




function Navbar() {
    const { comments, accessToken, updateEmail } = useGoogleDocs();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);  // State to track login status
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [userName, setUsername] = useState(null);
    // const placeholderImageUrl = './placeholder.png';  // Placeholder image URL



    const onSuccessLogin = (res) => {
        console.log("LOGIN SUCCESS! Current user :", res.profileObj);
        setIsUserLoggedIn(true);  // Set login status to true on successful login
        console.log(res.profileObj.imageUrl);
        setProfileImageUrl(res.profileObj.imageUrl);
        setUsername(res.profileObj.name);
        updateEmail(res.profileObj.email);
        console.log("EMAIL", res.profileObj.email);
    };

    const onSuccessLogout = (res) => {
        console.log("Log out successfull");
        setIsUserLoggedIn(false);  // Set login status to true on successful login
        setProfileImageUrl(null);
        setUsername(null);
        updateEmail(null);
    };

    const handleImageError = () => {
        console.log("need backup");
        setProfileImageUrl(placeholderImageUrl);  // Set the placeholder image if the profile image fails to load
    };

  return (
    <div className='navbar p-8 border mb-12 flex justify-between items-center'> {/* Flexbox container */}
        {/* Logo centered in the navbar */}
        <div className='absolute left-5 pl-5'>
            <h1 className='font-extralight text-2xl'>Leafeon Google Task Aggregator</h1>
        </div>

        <div className='absolute right-10 flex gap-4 items-center'>
                {!isUserLoggedIn ? (
                    <Login onSuccess={onSuccessLogin} />
                ) : (
                    <div className='flex items-center gap-2'>  {/* This div now uses Flexbox to align items horizontally */}
                        {profileImageUrl && <img src={profileImageUrl} alt="Profile" onError={handleImageError} style={{ height: '50px', borderRadius: '50%' }} />}
                        {userName && <p>{userName}</p>}
                        <Logout onSuccess={onSuccessLogout} />
                    </div>
                )}
            </div>
    </div>
  )
}  



export default Navbar