import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from './redux/actions';

const EditNote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notes = useSelector((state) => state.notes);
    const [note, setNote] = useState({ title: '', body: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            const existingNote = notes.find((note) => note.id === parseInt(id));
            if (existingNote) {
                setNote(existingNote);
                setLoading(false);
            } else {
                try {
                    const response = await fetch(`http://localhost:5000/notes/${id}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const fetchedNote = await response.json();
                    setNote(fetchedNote);
                } catch (error) {
                    console.error('Error fetching note:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchNote();
    }, [id, notes]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const updatedNote = await response.json();
            dispatch(updateNote(updatedNote.id, updatedNote)); // Update Redux state
            navigate('/notes'); // Navigate back to notes
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    if (loading) {
        return (
            <Typography variant="h6" align="center">
                Loading...
            </Typography>
        );
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Edit Note
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Body"
                    name="body"
                    value={note.body}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                    Save
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/notes')}
                    fullWidth
                >
                    Back
                </Button>
            </form>
        </Container>
    );
};

export default EditNote;
