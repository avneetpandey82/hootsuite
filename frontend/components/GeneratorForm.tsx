import React, { useState } from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';

export default function GeneratorForm({ onGenerate, loading = false }) {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Friendly');
  const [platform, setPlatform] = useState('LinkedIn');

  const handleSubmit = (e) => { e.preventDefault(); onGenerate(topic, tone, platform); };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Topic"
        placeholder="Enter topic"
        value={topic}
        onChange={e => setTopic(e.target.value)}
        disabled={loading}
      />
      <FormControl fullWidth>
        <InputLabel id="tone-label">Tone</InputLabel>
        <Select labelId="tone-label" value={tone} onChange={e => setTone(e.target.value)} label="Tone" disabled={loading}>
          <MenuItem value="Friendly">Friendly</MenuItem>
          <MenuItem value="Professional">Professional</MenuItem>
          <MenuItem value="Funny">Funny</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="platform-label">Platform</InputLabel>
        <Select labelId="platform-label" value={platform} onChange={e => setPlatform(e.target.value)} label="Platform">
          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
          <MenuItem value="Twitter">Twitter</MenuItem>
          <MenuItem value="Instagram">Instagram</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Generate</Button>
    </Box>
  );
} 