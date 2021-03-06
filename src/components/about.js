import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function About(props) {
    return (
        <div className='container'>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='row-content'>
                <h1>About.</h1>
                <p>About this project</p>
            </div>
            <div className='row-content'>
                <h2>Inspiration behind this project:</h2>
                <p>
                    This project was created to make duty scheduling easier, as part to help 
                    make things easier and automated. Extensions of the current version could 
                    probably be used to help do other form of matching. Might add additional 
                    features and upgrade the matching function in the future.
                </p>
            </div>
            <div className='row-content'>
                <h2>Front-end:</h2>
                <p>
                    The front end of this web app is created using the React framework, styled 
                    using Bootstrap. Redux is used to handle the information. 
                </p>
            </div>
            <div className='row-content'>
                <h2>Back-end:</h2>
                <p>
                    The backend server is create using the Express framework, to support REST API
                    calls.
                    <br></br>
                    In order to produce the match, a Maximum Bipartite Match is produced. The alogrithm 
                    used here is the Ford-Fulkerson Algorithm (Depth First Search is used within).
                </p>
            </div>
            <div className='row-content'>
                <h2>Hosting site:</h2>
                <p>
                    Hmm not sure which service to use to host the front-end web app and the 
                    back-end server. But oh well thats a problem for when i finish the project.
                </p>
            </div>
            <div className='row-last'>
                <h2>Creator:</h2>
                <p>
                    Hey! I'm Derek. I'm the creator of this project. This is the first project that 
                    I'm creating so everything is quite bareboned. Hopefully I can come back in the 
                    future and look at this and tell myself: "Wow i've really improved since when I 
                    just started". But oh well, that's for the future. This is me from June 2022. All 
                    the best to myself!
                </p>
            </div>
        </div>
    );
};

export default About;