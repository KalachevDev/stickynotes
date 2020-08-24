import React, { useRef, useCallback } from 'react';
import Note from '../Note/Note';

import './styles.css';

// onDragOver event to avoid delay on macOS
const onDragOver = event => event.preventDefault();

const NotesBoardComponent = ({ notes = [], updateNote, deleteNote }) => {
    const activeDragNote = useRef(null);
    const handleTrashZoneDrop = useCallback(() => deleteNote(activeDragNote.current), [deleteNote]);
    const handleDragStart = useCallback(id => activeDragNote.current = id, []);

    return (<div className="notes-board" onDragOver={onDragOver}>
        <div className="notes-board_list">
            {notes.map(note => <Note
                key={note.id}
                updateNote={updateNote}
                onHandleDragStart={handleDragStart}
                {...note}
            />)}
        </div>
        <div className="notes-board_trash-zone" onDrop={handleTrashZoneDrop}></div>
    </div>);
};

export default NotesBoardComponent;