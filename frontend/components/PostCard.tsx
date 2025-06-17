import React, { useState } from 'react';
import { Paper, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useRouter } from 'next/router';

export default function PostCard({ caption }) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const router = useRouter();

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setShowCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSchedulePost = () => {
    // Navigate to schedule page with the caption as a query parameter
    router.push({
      pathname: '/schedule',
      query: { caption: encodeURIComponent(caption) }
    });
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 1, boxShadow: 1 }}>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {caption}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyToClipboard}
          sx={{ minWidth: 'auto' }}
        >
          Copy
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<ScheduleIcon />}
          onClick={handleSchedulePost}
          sx={{ minWidth: 'auto' }}
        >
          Schedule
        </Button>
      </Box>
      <Snackbar
        open={showCopySuccess}
        autoHideDuration={2000}
        onClose={() => setShowCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowCopySuccess(false)} severity="success" sx={{ width: '100%' }}>
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
} 