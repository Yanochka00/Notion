import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './redux/actions';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const { errors, loading } = useSelector((state) => state.auth || {});

    const userSchema = z
        .object({
            email: z.string().email('Please enter a valid email.'),
            password: z.string().min(8, 'Password must be at least 8 characters long.'),
            confirmPassword: z.string().min(8, 'Password must be at least 8 characters long.'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match.',
            path: ['confirmPassword'],
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');
        try {
            userSchema.parse({ email, password, confirmPassword });
        } catch (validationError) {
            setLocalError(validationError.errors[0].message);
            return;
        }

        const newUser = { email, password, createdAt: Date.now() };
        try {
            await dispatch(registerUser(newUser));
            navigate('/about', { state: { email } });
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setLocalError('');
        } catch (error) {
            console.error('Error during registration:', error);
            setLocalError('Error connecting to the server.');
        }
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ padding: 2 }}>
            <Typography variant="h4" align="center">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    error={!!localError && localError.includes('email')}
                    helperText={localError && localError.includes('email') ? localError : ''}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ marginTop: '16px' }}
                    error={!!localError && localError.includes('Password')}
                    helperText={localError && localError.includes('Password') ? localError : ''}
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    sx={{ marginTop: '16px' }}
                    error={!!localError && localError.includes('Passwords do not match')}
                    helperText={
                        localError && localError.includes('Passwords do not match')
                            ? localError
                            : ''
                    }
                />
                {localError &&
                    !localError.includes('email') &&
                    !localError.includes('Password') && (
                        <Typography color="error">{localError}</Typography>
                    )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '16px' }}
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </Button>
            </form>
        </Container>
    );
};

export default Registration;
