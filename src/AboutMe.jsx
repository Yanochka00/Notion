import React from 'react';
import { Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AboutMe = () => {
    const userEmail = useSelector((state) => state.userEmail);
    const createdAt = useSelector((state) => state.createdAt);
    const registrationDate = createdAt
        ? new Date(createdAt).toLocaleDateString('ru-RU')
        : new Date().toLocaleDateString('ru-RU');

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: '#808080' }}>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/notes">
                        Notes
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About me
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Log out
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xl" style={{ padding: '16px' }}>
                <Typography variant="h3" align="center" gutterBottom>
                    About Me
                </Typography>
                <Typography variant="body1" align="center">
                    Email: {userEmail ? userEmail : 'Not provided'}
                </Typography>
                <Typography variant="body1" align="center">
                    Date of Sign Up: {registrationDate}
                </Typography>
                <Button
                    component={Link}
                    to="/notes"
                    fullWidth
                    variant="contained"
                    style={{ marginTop: '16px', backgroundColor: '#3f51b5', color: 'white' }}
                >
                    Go to Notes
                </Button>
            </Container>
        </>
    );
};

export default AboutMe;
