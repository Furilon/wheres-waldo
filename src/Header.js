import React from 'react';
import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        <div id="header">
            {!props.user
                ? <Link to="/game"><button onClick={props.signIn}>Sign In</button></Link>
                : <Link to="/"><button onClick={props.signOut}>Log Out</button></Link>
            }
        </div>
    );
}

export default Header;
