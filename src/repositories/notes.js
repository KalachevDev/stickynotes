import LocalStorageAdapter from '../adapters/local-storage';

const LOCAL_STORAGE_NOTES_KEY = 'STICKYNOTES_NOTES';

/**
 * Implements CRUD operations with Note entity.
 *
 * @type NotesRepository
 */
class NotesRepository {
    _initialized = false;
    _notes = null;
    _nextId = 0;

    /**
     * Takes all notes from the local storage and puts them into memory.
     * Also calculates the id for the next note.
     * Throws an error if repository already initialized.
     * 
     * @returns {Promise} Promise with all existing notes.
     */
    init() {
        if (this._initialized) {
            throw new Error('Notes repository is already initialized!');
        }

        this._notes = LocalStorageAdapter.getItem(LOCAL_STORAGE_NOTES_KEY) || [];
        this._nextId = this._notes.reduce((prev, currentNote) => {
            return (currentNote.id >= prev) ? (currentNote.id + 1) : prev;
        }, 0);
        this._initialized = true;

        return this.getAll();
    }

    /**
     * Creates a new note and perists it.
     *
     * @param {string} text Text to be shown at the note. 
     * @returns {Array} List of all notes.
     */
    createNote(text) {
        if (!this._initialized) {
            throw new Error('Notes repositories is not iniatialized!');
        }

        const note = { id: this._nextId, text, width: 124, height: 124, left: 0, top: 0, theme: 'default' };
        this._notes = [...this._notes, note];

        LocalStorageAdapter.setItem(LOCAL_STORAGE_NOTES_KEY, this._notes);
        this._nextId++;

        return this.getAll();
    }

    /**
     * Deletes note with given id.
     *
     * @param {number} id
     */
    deleteNote(id) {
        if (!this._initialized) {
            throw new Error('Notes repositories is not iniatialized!');
        }

        const notes = this._notes.filter(note => note.id !== id);

        return this._saveNotes(notes);
    }

    /**
     * Updates note with given properties.
     *
     * @param {object} properties
     */
    updateNote(id, properties) {
        if (!this._initialized) {
            throw new Error('Notes repositories is not iniatialized!');
        }

        const index = this._notes.findIndex(n => n.id === id);
        const notes = [
            ...this._notes.slice(0, index),
            { id, ...this._notes[index], ...properties },
            ...this._notes.slice(index + 1)
        ];

        return this._saveNotes(notes);
    }

    /**
     * @returns {Promise} Promise with all existing notes.
     */
    getAll() {
        if (!this._initialized) {
            throw new Error('Notes repositories is not iniatialized!');
        }

        return Promise.resolve([...this._notes]);
    }

    /**
     * Takes an array of new notes and persists it to memory and local storage.
     *
     * @param {Array} notes
     * @returns {Promise} Promise with all existing notes.
     */
    _saveNotes(notes) {
        this._notes = notes;
        LocalStorageAdapter.setItem(LOCAL_STORAGE_NOTES_KEY, notes);

        return this.getAll();
    }
}

export default new NotesRepository();