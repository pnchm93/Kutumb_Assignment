import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography } from '@mui/material';

const CreateQuote = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('file', image);
        const response = await axios.post('https://crafto.app/crafto/v1.0/media/assignment/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.mediaUrl;
    };

    const handleSubmit = async () => {
        try {
            const mediaUrl = await handleImageUpload();
            const response = await axios.post('https://assignment.stage.crafto.app/postQuote', {
                text,
                mediaUrl
            }, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json'
                }
            });

            // Debugging
            console.log('Quote created successfully:', response.data);

            // Navigate back with the new quote as state
            navigate('/quotes', { state: { newQuote: response.data }, replace: true });
        } catch (error) {
            console.error('Error creating quote', error);
        }
    };


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Create Quote</Typography>
            <TextField
                label="Quote Text"
                variant="outlined"
                fullWidth
                margin="normal"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ margin: '20px 0' }}
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

export default CreateQuote;
