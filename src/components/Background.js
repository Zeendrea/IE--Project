import React from "react";

const Background = () => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 502 532"
                fill="none"
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 502,
                    height: 532
                }}
            >
                <defs>
                    <linearGradient id="paint0" x1="200.75" y1="0" x2="200.75" y2="647.435" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF6B6B" />
                        <stop offset="1" stopColor="#FFBE5B" />
                    </linearGradient>
                </defs>
                <path
                    d="M501.5 540.148C501.5 678.22 288.071 643.564 150 643.564C11.9288 643.564 -100 531.635 -100 393.564C-100 255.493 -68.463 -186.851 28.4999 88.564C75.5 222.064 181 517.148 501.5 540.148Z"
                    fill="url(#paint0)"
                    fillOpacity="0.99"
                />
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 502 532"
                fill="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transform: 'rotate(180deg)',
                    width: 502,
                    height: 532
                }}
            >
                <defs>
                    <linearGradient id="paint1" x1="200.75" y1="0" x2="200.75" y2="647.435" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF6B6B" />
                        <stop offset="1" stopColor="#FFBE5B" />
                    </linearGradient>
                </defs>
                <path
                    d="M501.5 540.148C501.5 678.22 288.071 643.564 150 643.564C11.9288 643.564 -100 531.635 -100 393.564C-100 255.493 -68.463 -186.851 28.4999 88.564C75.5 222.064 181 517.148 501.5 540.148Z"
                    fill="url(#paint1)"
                    fillOpacity="0.99"
                />
            </svg>
        </>
    );
};

export default Background;
