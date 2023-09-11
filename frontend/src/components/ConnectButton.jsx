import React from 'react';
import "../styles/components/ConnectButton.scss";

export default function ConnectButton({ height, width, text, clickHandle }) {
    const buttonStyle = {
        height: height,
        width: width,
    };

    return (
        <>
            <button className='connect_button' style={buttonStyle} onClick={clickHandle}>{text}</button>
        </>
    );
};
