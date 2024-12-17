import { combineReducers } from 'redux';
import {
    ADD_NOTE,
    DELETE_NOTE,
    UPDATE_NOTE,
    FETCH_NOTES_REQUEST,
    FETCH_NOTES_SUCCESS,
    FETCH_NOTES_FAILURE,
    CLEAR_ERRORS,
} from './actions';

const initialState = {
    notes: [],
    loading: false,
    error: null,
};

// Reducer для заметок
const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTE:
            return { ...state, notes: [...state.notes, action.payload] };
        case DELETE_NOTE:
            return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
        case UPDATE_NOTE:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.noteId ? { ...note, ...action.payload.updatedData } : note
                ),
            };
        case FETCH_NOTES_REQUEST:
            return { ...state, loading: true };
        case FETCH_NOTES_SUCCESS:
            return { ...state, loading: false, notes: action.payload };
        case FETCH_NOTES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CLEAR_ERRORS:
            return { ...state, error: null };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    notes: notesReducer,
});

export default rootReducer;