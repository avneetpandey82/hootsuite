import React, { useState } from 'react';
import GeneratorForm from '../components/GeneratorForm';
import PostCard from '../components/PostCard';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Button,
  Alert
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useRouter } from 'next/router';

export default function GeneratePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGenerate = async (topic:string, tone:string, platform:string) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/generatePosts', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json' }, 
        body: JSON.stringify({ topic, tone, platform }) 
      });
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data.captions.captions);
      } else {
        setError('Failed to generate posts. Please try again.');
      }
    } catch (error) {
      console.error('Error generating posts:', error);
      setError('Failed to generate posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }}>
          AI Social Post Generator
        </Typography>
        <Button
          variant="outlined"
          startIcon={<DashboardIcon />}
          onClick={handleNavigateToDashboard}
        >
          View Scheduled
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        <GeneratorForm onGenerate={handleGenerate} loading={loading} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {posts.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Generated Posts ({posts.length})
          </Typography>
          <Grid container spacing={2}>
            {posts.map((caption, index) => (
              <Grid item xs={12} key={index}>
               <PostCard caption={caption} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
} 