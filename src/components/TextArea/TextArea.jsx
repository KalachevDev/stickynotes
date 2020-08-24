import React from 'react';

const TextAreaComponent = ({ value, onChange, ...rest }) => (
    <textarea value={value} onChange={onChange} {...rest} />
);

export default TextAreaComponent;