// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://assignment.stage.crafto.app/login', {
                username,
                otp
            });
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            navigate('/create-quote');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Container>
    );
};

export default Login;
