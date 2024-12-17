import React, { useState } from 'react';
import {
    Button,
    TextField,
    TextareaAutosize,
    Container,
    Typography,
    AppBar,
    Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNote } from './redux/actions';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!title) {
            validationErrors.title = 'Название заметки не может быть пустым';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newNote = {
            title,
            body,
            createdAt: new Date().toISOString(),
        };

        try {
            await dispatch(createNote(newNote)); // Dispatch the createNote action
            navigate('/notes'); // Navigate back to Notes after creation
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

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
            <Container component="main" maxWidth="xs" sx={{ padding: 2, mt: 4, mb: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Create new note
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        fullWidth
                        margin="normal"
                        required
                        sx={{ mt: 2 }}
                    />
                    <TextareaAutosize
                        minRows={3}
                        placeholder="Note text..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{
                            width: '100%',
                            marginTop: '8px',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid lightgray',
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, bgcolor: '#3f51b5' }}
                    >
                        Create
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ mt: 2, width: '100%' }}
                        onClick={() => navigate('/notes')}
                    >
                        Back
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default CreateNote;
