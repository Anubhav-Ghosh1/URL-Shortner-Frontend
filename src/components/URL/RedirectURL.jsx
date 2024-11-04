// components/URL/URLRedirect.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { redirectURL } from '../../services/operation/urlAPI';
import { useParams } from 'react-router-dom';

const RedirectURL = () => {
    const { url } = useParams(); // Get the shortened URL from the URL parameters
    const dispatch = useDispatch();

    useEffect(() => {
        // Call the redirectURL function with the shortened URL
        dispatch(redirectURL(url));
    }, [dispatch, url]);

    return <div>Redirecting...</div>; // Optional loading message
};

export default RedirectURL;