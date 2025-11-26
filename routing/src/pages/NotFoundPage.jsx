import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <h1> oopss, not found page</h1>
            <button onClick={() =>navigate(-1)}>Go back</button>
            <br />
            <img src="https://http.cat/images/404.jpg" alt="404 http cat"/>
        </div>
    )
}

export default NotFoundPage;