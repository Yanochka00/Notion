import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AboutMe from './AboutMe';
import LogIn from './LogIn';
import Registration from './Registration';
import Notes from './Notes';
import CreateNote from './CreateNote';
import EditNote from './EditNote';
import NotFound from './NotFound';
import { CssBaseline, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUserEmail, addNote, deleteNote, updateNote } from './redux/actions';

const App = () => {
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.userEmail);
    const notes = useSelector((state) => state.notes);

    const handleRegister = (email) => {
        dispatch(setUserEmail(email));
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ width: '80%', margin: '0 auto' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/registration" />} />
                    <Route
                        path="/registration"
                        element={<Registration onRegister={handleRegister} />}
                    />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/about" element={<AboutMe email={userEmail} />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route
                        path="/create-note"
                        element={<CreateNote addNote={(note) => dispatch(addNote(note))} />}
                    />
                    <Route
                        path="/edit-note/:id"
                        element={
                            <EditNote
                                updateNote={(id, updatedNote) =>
                                    dispatch(updateNote(id, updatedNote))
                                }
                            />
                        }
                    />

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </Container>
        </>
    );
};

export default App;
