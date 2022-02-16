import React from 'react';
import img0 from './assets/the-loc-nar.314cec99.jpg'

const Game = (props) => {
    return (
        <div id="game" onClick={props.gameFunc}>
            <img src={img0} alt="sgds" />
        </div>
    );
}

export default Game;
