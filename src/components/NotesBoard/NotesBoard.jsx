import React from 'react';
import Note from '../Note/Note';

import './styles.css';

const NotesBoard = ({ notes = [] }) => {
    return (<div className="notes-board">
        {notes.map(note => <Note key={note.id} {...note} />)}
    </div>);
};

export default NotesBoard;