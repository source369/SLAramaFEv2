import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Container, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const { submitRegistration } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', passport: '', issuingCountry: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitRegistration(form);
    setMessage('Registration request submitted. You will be notified upon approval.');
    setForm({ name: '', email: '', passport: '', issuingCountry: '', password: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Visiting Monk Registration
        </Typography>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Email" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Passport Number" name="passport" value={form.passport} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Issuing Country" name="issuingCountry" value={form.issuingCountry} onChange={handleChange} sx={{ mb: 2 }} required />
          <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} required />
          <Button variant="contained" type="submit">Submit</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
