import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

export default function SchedulePage() {
  const [caption, setCaption] = useState('');
  const [datetime, setDatetime] = useState('');
  const [status, setStatus] = useState('');
  const [dateError, setDateError] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState('');
  const router = useRouter();

  // Get current date and time in the format required by datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    // Add 1 minute to current time to ensure we don't allow scheduling for the current minute
    now.setMinutes(now.getMinutes() + 1);
    return now.toISOString().slice(0, 16);
  };

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

  // Validate date and time
  const validateDateTime = (dateTimeString: string) => {
    if (!dateTimeString) {
      setDateError('');
      return false;
    }

    const selectedDate = new Date(dateTimeString);
    const currentDate = new Date();

    // Check if selected date is in the past
    if (selectedDate <= currentDate) {
      setDateError('Please select a future date and time');
      return false;
    }

    // Check if date is too far in the future (optional - you can adjust this)
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1); // 1 year from now
    
    if (selectedDate > maxDate) {
      setDateError('Please select a date within the next year');
      return false;
    }

    setDateError('');
    return true;
  };

  // Handle datetime change
  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDatetime(value);
    validateDateTime(value);
  };

  // Check if form has unsaved changes
  const hasUnsavedChanges = () => {
    return caption.trim() !== '' || datetime !== '';
  };

  // Handle navigation with confirmation
  const handleNavigation = (path: string) => {
    if (hasUnsavedChanges()) {
      setPendingNavigation(path);
      setShowConfirmDialog(true);
    } else {
      router.push(path);
    }
  };

  // Confirm navigation and discard changes
  const confirmNavigation = () => {
    setShowConfirmDialog(false);
    setCaption('');
    setDatetime('');
    setStatus('');
    setDateError('');
    router.push(pendingNavigation);
  };

  // Cancel navigation
  const cancelNavigation = () => {
    setShowConfirmDialog(false);
    setPendingNavigation('');
  };

  const handleSchedule = async () => {
    // Validate date before scheduling
    if (!validateDateTime(datetime)) {
      setStatus('Please select a valid future date and time.');
      return;
    }

    try {
      const response = await fetch('/api/savePosts', { 
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
          setDateError('');
          // Redirect to dashboard after successful scheduling
          router.push('/dashboard');
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
    handleNavigation('/generate');
  };

  // Check if form is valid for submission
  const isFormValid = () => {
    return caption.trim() !== '' && 
           datetime !== '' && 
           dateError === '';
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
          label="Schedule Date & Time"
          value={datetime}
          onChange={handleDateTimeChange}
          slotProps={{
            htmlInput: {
              min: getCurrentDateTime(), // Set minimum date to current time + 1 minute
            }
          }}
          error={!!dateError}
          helperText={dateError || "Select when you want to publish this post"}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSchedule} 
          sx={{ mt: 2 }}
          disabled={!isFormValid()}
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

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={cancelNavigation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Unsaved Changes
        </DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Once you leave this page, you'll lose your generated post. 
            Are you sure you want to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelNavigation} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmNavigation} color="error" variant="contained">
            Leave Anyway
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 