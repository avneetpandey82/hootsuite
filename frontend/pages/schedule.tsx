import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Alert, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

export default function SchedulePage() {
  const [caption, setCaption] = useState('');
  const [datetime, setDatetime] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  // Auto-fill caption from URL query parameter
  useEffect(() => {
    if (router.query.caption) {
      try {
        const decodedCaption = decodeURIComponent(router.query.caption as string);
        setCaption(decodedCaption);
      } catch (error) {
        console.error('Error decoding caption:', error);
      }
    }
  }, [router.query.caption]);

  const handleSchedule = async () => {
    try {
      const response = await fetch('http://localhost:7071/api/savePost', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ caption, datetime }) 
      });
      
      if (response.ok) { 
        setStatus('Post scheduled successfully!');
        // Clear form after successful save
        setTimeout(() => {
          setCaption('');
          setDatetime('');
          setStatus('');
        }, 2000);
      } else { 
        setStatus('Failed to schedule post.'); 
      }
    } catch (error) {
      console.error('Error scheduling post:', error);
      setStatus('Failed to schedule post. Please try again.');
    }
  };

  const handleNavigateToGenerate = () => {
    router.push('/generate');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Schedule Your Post
      </Typography>
      
      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Enter caption..."
          value={caption}
          onChange={e => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          type="datetime-local"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSchedule} 
          sx={{ mt: 2 }}
          disabled={!caption.trim() || !datetime}
          fullWidth
        >
          Schedule Post
        </Button>
      </Box>

      {status && (
        <Alert severity={status.includes("success") ? "success" : "error"} sx={{ mt: 2 }}>
          {status}
        </Alert>
      )}

      <Divider sx={{ my: 4 }} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Need content to schedule?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Generate AI-powered social media posts
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleNavigateToGenerate}
        >
          Generate Posts
        </Button>
      </Box>
    </Container>
  );
} 