import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function StayRequest() {
  const { submitStayRequest, currentUser } = useAuth();
  const [form, setForm] = useState({ from: '', to: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitStayRequest({ ...form, monkEmail: currentUser.email });
    setMessage('Stay request submitted');
    setForm({ from: '', to: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          New Stay Request
        </Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth type="date" name="from" label="From" InputLabelProps={{ shrink: true }} value={form.from} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth type="date" name="to" label="To" InputLabelProps={{ shrink: true }} value={form.to} onChange={handleChange} sx={{ mb: 2 }} required />
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default StayRequest;
