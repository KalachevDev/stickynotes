import { LOCAL_STORAGE_NOTES_KEY } from '../const';

const localStorage = window.localStorage;

export const addNote = note => {};
export const deleteNote = id => {};
export const updateNote = note => {};

export const getAllNotes = () => {
    const jsonNotes = localStorage.getItem(LOCAL_STORAGE_NOTES_KEY);
    const notes = JSON.parse(jsonNotes);

    return Promise.resolve(notes);
};