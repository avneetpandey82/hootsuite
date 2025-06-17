import React, { useState } from 'react';
import { Paper, Typography, Button, Box, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useRouter } from 'next/router';

export default function PostCard({ caption }) {
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
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
    setShowScheduleDialog(true);
  };

  const confirmSchedule = () => {
    setShowScheduleDialog(false);
    // Navigate to schedule page with the caption as a query parameter
    router.push({
      pathname: '/schedule',
      query: { caption: encodeURIComponent(caption) }
    });
  };

  const cancelSchedule = () => {
    setShowScheduleDialog(false);
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

      {/* Schedule Confirmation Dialog */}
      <Dialog
        open={showScheduleDialog}
        onClose={cancelSchedule}
        aria-labelledby="schedule-dialog-title"
        aria-describedby="schedule-dialog-description"
      >
        <DialogTitle id="schedule-dialog-title">
          Schedule This Post?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            You're about to navigate to the schedule page. Once you leave the generate page, 
            you'll lose access to this generated post unless you copy it first.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Tip:</strong> You can copy this post first, then schedule it later.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelSchedule} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmSchedule} color="primary" variant="contained">
            Continue to Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
} 