// Определение типов действий
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER_USER = 'REGISTER_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const FETCH_NOTES_REQUEST = 'FETCH_NOTES_REQUEST';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';
export const FETCH_NOTE_REQUEST = 'FETCH_NOTE_REQUEST';
export const FETCH_NOTE_SUCCESS = 'FETCH_NOTE_SUCCESS';
export const FETCH_NOTE_FAILURE = 'FETCH_NOTE_FAILURE';
export const SET_NOTES = 'SET_NOTES';
export const CLEAR_NOTES = 'CLEAR_NOTES';

// Действие для добавления заметки
export const addNote = (noteData) => ({
    type: ADD_NOTE,
    payload: noteData,
});

// Действие для удаления заметки
export const deleteNote = (noteId) => ({
    type: DELETE_NOTE,
    payload: noteId,
});

// Действие для обновления заметки
export const updateNote = (noteId, updatedData) => ({
    type: UPDATE_NOTE,
    payload: { noteId, updatedData },
});

// Действие для входа пользователя
export const logIn = (userData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при входе');
        }

        const data = await response.json();
        dispatch({ type: LOG_IN, payload: data });
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.message });
    }
};

// Действие для выхода пользователя
export const logOut = () => ({
    type: LOG_OUT,
});

// Действие для регистрации пользователя
export const registerUser = (userData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при регистрации');
        }

        const data = await response.json();
        dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
        dispatch({ type: AUTH_ERROR, payload: error.message });
    }
};

// Действие для установки email пользователя
export const setUserEmail = (email) => ({
    type: SET_USER_EMAIL,
    payload: email,
});

// Действие для очистки ошибок
export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});

// Действие для получения заметки
export const fetchNote = (noteId) => async (dispatch) => {
    dispatch({ type: FETCH_NOTE_REQUEST });

    try {
        const response = await fetch(`http://localhost:5000/notes/${noteId}`);
        if (!response.ok) {
            throw new Error('Не удалось получить заметку.');
        }
        const data = await response.json();
        dispatch({ type: FETCH_NOTE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_NOTE_FAILURE, payload: error.message });
    }
};

// Действие для получения всех заметок
export const fetchNotes = () => async (dispatch) => {
    dispatch({ type: FETCH_NOTES_REQUEST });

    try {
        const response = await fetch('http://localhost:5000/notes');
        if (!response.ok) {
            throw new Error('Не удалось получить заметки.');
        }
        const data = await response.json();
        dispatch({ type: FETCH_NOTES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FETCH_NOTES_FAILURE, payload: error.message });
    }
};

// Действие для создания заметки
export const createNote = (noteData) => async (dispatch) => {
    dispatch({ type: FETCH_NOTES_REQUEST }); // Set loading state

    try {
        const response = await fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData),
        });

        if (!response.ok) {
            throw new Error('Не удалось создать заметку');
        }

        const newNote = await response.json();
        dispatch(addNote(newNote)); // Dispatch the addNote action
    } catch (error) {
        dispatch({ type: FETCH_NOTES_FAILURE, payload: error.message });
    }
};

// Действие для установки заметок
export const setNotes = (notes) => ({
    type: SET_NOTES,
    payload: notes,
});

// Действие для очистки заметок
export const clearNotes = () => ({
    type: CLEAR_NOTES,
});