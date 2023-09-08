import React from 'react';
import "../styles/components/ConnectButton.scss";

export default function ConnectButton({ height, width, text }) {
    const buttonStyle = {
        height: height,
        width: width,
    };

    return (
        <>
            <button className='connect_button' style={buttonStyle}>{text}</button>
        </>
    );
};
