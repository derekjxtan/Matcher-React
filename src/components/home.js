import React from 'react';

function Home(props) {
    return (
        <div className='container'>
            <div className='row-content'>
                <h1>Welcome to Matcher.</h1>
                <p>
                    The purpose of this project is to provide a service for people to match 
                    1 set of things to another set based on others input. Examples where this 
                    can be used include: duty scheduling, issuing items based on preferences, 
                    assigning things to people, or any other applications that you can think 
                    of.
                </p>
            </div>
            <div className='row-content'>
                <h2>If you're a Matcher:</h2>
                <p>
                    Login or Register to start creating a new match. This is to ensure that 
                    only you can opt to generate the results.
                </p>
                <p>
                    Click on "Create New Match" to start creating a new Match for others to 
                    submit their inputs. If you're here to view the results of a Match you 
                    already created, click on "Matches" to view your Matches.
                </p>
            </div>
            <div className='row-last'>
                <h2>If you're a Matchee:</h2>
                <p>
                    Click on "Submit Response" in order to submit your inputs for a created 
                    match.
                </p>
            </div>
        </div>
    );
};

export default Home;