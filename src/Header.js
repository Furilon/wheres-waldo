import React from 'react';
import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        // If user is signed in, show "sign out", and vice versa
        <div id="header">
            {!props.user
                ? <Link to="/game"><button onClick={props.signIn}>Sign In</button></Link>
                : <Link to="/"><button onClick={props.signOut}>Log Out</button></Link>
            }
        </div>
    );
}

export default Header;
