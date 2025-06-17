import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Paper, 
  Button, 
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:7071/api/getPosts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts || []);
      } else {
        setError('Failed to load posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToGenerate = () => {
    router.push('/generate');
  };

  const formatDateTime = (dateTimeString) => {
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString();
    } catch (error) {
      return dateTimeString;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Scheduled Posts
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {posts.length === 0 && !error ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3
        }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No scheduled posts yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start by generating some AI-powered social media posts
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleNavigateToGenerate}
            sx={{ px: 4, py: 1.5 }}
          >
            Generate Posts
          </Button>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" color="text.secondary">
              {posts.length} scheduled post{posts.length !== 1 ? 's' : ''}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleNavigateToGenerate}
            >
              Generate More
            </Button>
          </Box>
          <List>
            {posts.map((post, idx) => (
              <ListItem key={idx} sx={{ mb: 2 }}>
                <Paper elevation={1} sx={{ p: 2, width: '100%' }}>
                  <ListItemText 
                    primary={post.caption} 
                    secondary={`Scheduled for: ${formatDateTime(post.datetime)}`}
                    primaryTypographyProps={{ sx: { mb: 1 } }}
                    secondaryTypographyProps={{ color: 'text.secondary' }}
                  />
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
} 