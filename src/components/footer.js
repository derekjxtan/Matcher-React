import React from 'react';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='row-last'>
                    <div className='col-md-5'>
                        <h5>Links</h5>
                        <ul className='list-unstyled'>
                            <li><Link to='/home' className='link'>Home</Link></li>
                            <li><Link to='/newmatch' className='link'>Create New Match</Link></li>
                            <li><Link to='/matches' className='link'>Matches</Link></li>
                            <li><Link to='/submit' className='link'>Submit</Link></li>
                            <li><Link to='/feedback' className='link'>Feedback</Link></li>
                            <li><Link to='/about' className='link'>About</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;