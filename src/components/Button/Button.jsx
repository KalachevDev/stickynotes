import React from 'react';

const ButtonComponent = ({ children, onClick, ...rest }) => {
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

export default ButtonComponent;