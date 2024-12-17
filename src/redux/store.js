import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

// Initial state
const initialState = {
    userEmail: '',
    notes: [],
    loading: false,
    error: null,
};

// Action Types
const SET_USER_EMAIL = 'SET_USER_EMAIL';
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const SET_NOTES = 'SET_NOTES';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';

// Action Creators
export const setUserEmail = (email) => ({
    type: SET_USER_EMAIL,
    payload: email,
});

export const addNote = (noteData) => ({
    type: ADD_NOTE,
    payload: noteData,
});

export const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    payload: noteId,
});

export const updateNote = (noteId, updatedData) => ({
    type: UPDATE_NOTE,
    payload: { id: noteId, updatedNote: updatedData },
});

export const setNotes = (notes) => ({
    type: SET_NOTES,
    payload: notes,
});

// Async Action Creators
export const fetchNotes = () => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await fetch('http://localhost:5000/notes');
        if (!response.ok) throw new Error('Failed to fetch notes');
        
        const data = await response.json();
        dispatch(setNotes(data));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
        dispatch({ type: SET_LOADING, payload: false });
    }
};

export const createNote = (noteData) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });

        if (!response.ok) throw new Error('Failed to create note');
        
        const newNote = await response.json();
        dispatch(addNote(newNote));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
        dispatch({ type: SET_LOADING, payload: false });
    }
};

export const removeNote = (noteId) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
        const response = await fetch(`http://localhost:5000/notes/${noteId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete note');
        
        dispatch(deleteNote(noteId));
    } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
        dispatch({ type: SET_LOADING, payload: false });
    }
};

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_EMAIL:
            return { ...state, userEmail: action.payload };
        case ADD_NOTE:
            return { ...state, notes: [...state.notes, action.payload] };
        case DELETE_NOTE:
            return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ? { ...note, ...action.payload.updatedNote } : note
                ),
            };
        case SET_NOTES:
            return { ...state, notes: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        case SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

// Create Store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;