import React, { useState } from 'react';
import { Button, TextField, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from './redux/actions';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth) || {};
    const { errors: reduxErrors = {}, loading } = auth;
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [localErrors, setLocalErrors] = useState({});

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!formData.email) {
            validationErrors.email = 'Please enter an email address';
        }
        if (!formData.password) {
            validationErrors.password = 'Please enter a password';
        }

        if (Object.keys(validationErrors).length > 0) {
            setLocalErrors(validationErrors);
        } else {
            dispatch(logIn(formData));
            navigate('/about'); // Измените это на нужный вам маршрут после логина
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#808080' }}>
                <Toolbar>
                    <Button color="inherit" onClick={() => navigate('/registration')}>
                        Sign up
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <Typography variant="h5" component="h1" align="center" gutterBottom>
                    Log In
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(localErrors.email || reduxErrors.email)}
                        helperText={localErrors.email || reduxErrors.email}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(localErrors.password || reduxErrors.password)}
                        helperText={localErrors.password || reduxErrors.password}
                        variant="outlined"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '16px', backgroundColor: '#3f51b5', color: 'white' }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </Button>
                </form>
            </Container>
        </>
    );
};

export default LogIn;
