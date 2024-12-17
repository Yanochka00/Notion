import React, { useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    AppBar,
    Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, deleteNote } from './redux/actions';

const Notes = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notes, loading, error } = useSelector((state) => state);

    useEffect(() => {
        dispatch(fetchNotes()); // Fetch notes when component mounts
    }, [dispatch]);

    const handleEdit = (note) => {
        navigate(`/edit-note/${note.id}`);
    };

    const handleDelete = (noteId) => {
        dispatch(deleteNote(noteId));
    };

    if (loading) return <Typography>Loading notes...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#808080' }}>
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate('/notes')}>
                        Notes
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/about')}>
                        About me
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Notes
                </Typography>
                <Button
                    onClick={() => navigate('/create-note')}
                    variant="contained"
                    color="primary"
                    sx={{ mb: 3, bgcolor: '#3f51b5' }}
                >
                    Create new note
                </Button>
                <List sx={{ bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
                    {notes.map((note) => (
                        <ListItem
                            key={note.id}
                            button
                            onClick={() => handleEdit(note)}
                            sx={{
                                '&:hover': { bgcolor: 'action.hover' },
                                borderBottom: '1px solid lightgray',
                            }}
                        >
                            <ListItemText
                                primary={note.title}
                                secondary={
                                    <>
                                        <Typography variant="body1" color="text.secondary">
                                            {note.body}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created:{' '}
                                            {new Date(note.createdAt).toLocaleString('ru-RU')}
                                        </Typography>
                                    </>
                                }
                            />
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(note);
                                }}
                                sx={{ color: 'primary.main' }}
                            >
                                ✍️
                            </IconButton>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(note.id);
                                }}
                                sx={{ color: 'error.main' }}
                            >
                                🗑️
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </>
    );
};

export default Notes;
