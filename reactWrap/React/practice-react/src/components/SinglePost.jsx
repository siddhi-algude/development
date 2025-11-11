import React,{useContext} from 'react';

import { loggincontext } from '../App';

const SinglePost = ( ) => {
    const login = useContext(loggincontext);
    console.log(login);
    return <h3>Single Post</h3>
}

export default SinglePost;

// useContext is used to manage global data in app