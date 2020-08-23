import React from 'react';

const Button = ({ children, onClick, ...rest }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            {...rest}
        >
            {children}
        </button>
    )
};

export default Button;