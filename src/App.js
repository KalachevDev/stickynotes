import React, { useEffect, useState, useCallback } from 'react';
import NotesBoard from './components/NotesBoard/NotesBoard';
import Button from './components/Button/Button';
import NotesRepository from './repositories/notes';
import { SAMPLE_NOTE_KEY } from './const';

import './app.css';

const getNoteAction = (action, setNotes) => {
  if (typeof NotesRepository[action] === 'function') {
    return (...args) => NotesRepository[action](...args)
      .then(allNotes => setNotes(allNotes));
  } else {
    throw new Error(`Invalid action passed to the Notes repository, ${action}`);
  }
};

/**
 * Component that contains state of the application.
 */
function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    NotesRepository.init()
      .then(setNotes);
  }, []);

  const onCreateNote = useCallback(() => getNoteAction('createNote', setNotes)(SAMPLE_NOTE_KEY), []);
  const onDeleteNote = useCallback(getNoteAction('deleteNote', setNotes), []);
  const onUpdateNote = useCallback(getNoteAction('updateNote', setNotes), []);

  return (<div className="application-wrapper">
    <NotesBoard
      notes={notes}
      updateNote={onUpdateNote}
      deleteNote={onDeleteNote}
    />
    <Button className="add-btn" onClick={onCreateNote}>+</Button>
  </div>);
}

export default App;
