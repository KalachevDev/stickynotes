import React from 'react';

import './styles.css';

export default ({ id, text }) => {
    return (<div className="note" draggable={true}>
        <div className="note_text">
            {text}
        </div>
    </div>)
};