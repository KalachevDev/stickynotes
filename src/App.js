import React, { useEffect, useState } from 'react';
import NotesBoard from './components/NotesBoard/NotesBoard';
import Button from './components/Button/Button';
import { addNote, getAllNotes } from './adapters/notes';

import './app.css';

/**
 * Component that contains state of the application.
 */
function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes()
      .then(allNotes => {
        if (allNotes !== null) {
          setNotes(allNotes);
        }
      });
  }, []);

  const saveNote = note => {
    addNote(note)
      .then(allNotes => setNotes(allNotes));
  };

  const deleteNote = id => {
    deleteNote(id)
      .then(allNotes => setNotes(allNotes));
  };

  return (<div className="application-wrapper">
    <Button className="add-btn">+</Button>
    <NotesBoard
      notes={notes}
      addNote={saveNote}
      updateNote={() => console.log('IMPLEMENT NODE UPDATING')}
      deleteNote={deleteNote}
    />
  </div>);
}

export default App;
