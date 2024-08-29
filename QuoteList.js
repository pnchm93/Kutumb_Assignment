import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Fab, Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');
    const location = useLocation();

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axios.get(`https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${offset}`, {
                    headers: {
                        Authorization: token
                    }
                });

                if (Array.isArray(response.data.data)) {
                    setQuotes(prevQuotes => [...prevQuotes, ...response.data.data]);
                    setOffset(20);

                    if (response.data.data.length < 20) {
                        setHasMore(false);
                    }
                } else {
                    console.error('Expected array but got:', response.data);
                }
            } catch (error) {
                console.error('Error fetching quotes', error);
            }
        };

        fetchQuotes();

        if (location.state?.newQuote) {
            setQuotes(prevQuotes => [location.state.newQuote, ...prevQuotes]);
        }
    }, [token, location.state, offset]);

    const loadMoreQuotes = () => {
        if (hasMore) {
            setOffset(offset + 20);
        }
    };

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                {quotes.map((quote) => (
                    <Grid item xs={12} sm={6} md={4} key={quote.id}>
                        <Card sx={{ height: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <Box sx={{ position: 'relative', height: '350px' }}>
                                <CardMedia
                                    component="img"
                                    image={quote.mediaUrl}
                                    alt={quote.mediaUrl ? "Quote Image" : "No image"}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain', // Adjusts the image to be fully visible within the given area
                                    }}
                                />
                                <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
                                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                        {quote.text ? quote.text : "No quotes available"}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <CardContent sx={{ textAlign: 'center', padding: '8px' }}>
                                <Typography variant="body2" color="text.secondary">
                                    {quote.username} - {quote.updatedAt ? new Date(quote.updatedAt).toLocaleString() : "Date not available"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {hasMore && (
                <Button onClick={loadMoreQuotes} fullWidth variant="contained" color="primary">
                    Load More
                </Button>
            )}
            <Fab
                color="primary"
                aria-label="add"
                style={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => navigate('/create-quote')}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
};

export default QuoteList;
