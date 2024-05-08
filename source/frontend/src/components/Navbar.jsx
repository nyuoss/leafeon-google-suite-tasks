import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Login from './login';
import Logout from './logout';
import { useGoogleDocs } from '../GoogleDocsContext';




function Navbar() {
    const { comments, onSuccessLogin } = useGoogleDocs();
  return (
    <div className='navbar p-8 border mb-12 flex justify-between items-center'> {/* Flexbox container */}
        {/* Logo centered in the navbar */}
        <div className='absolute left-5 pl-5'>
            <h1 className='font-extralight text-2xl'>Leafeon Google Task Aggregator</h1>
        </div>

        <div className='absolute right-10 flex gap-4'>
            <div>
                <Login onSuccess={onSuccessLogin} />
            </div>
            <div>
                <Logout />
            </div>
        </div>
        
       
        {/* <img src="nike.svg" alt="Logo" className="logo" style={{height:50}}/> Add your logo image here */}
    </div>
  )
}  



export default Navbar