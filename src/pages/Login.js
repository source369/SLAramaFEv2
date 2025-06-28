import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Avatar,
  CircularProgress,
  Link,
} from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Form validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (userType) => {
    setLoading(true);
    setError('');

    try {
      let demoEmail, demoPassword;

      switch (userType) {
        case 'admin':
          demoEmail = 'admin@example.com';
          demoPassword = 'password';
          break;
        case 'owner':
          demoEmail = 'owner@example.com';
          demoPassword = 'password';
          break;
        default: // general user
          demoEmail = 'user@example.com';
          demoPassword = 'password';
          break;
      }

      await login(demoEmail, demoPassword);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign in to SLArama
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, mb: 1 }}>
            For demo purposes, you can use these accounts:
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
            >
              User Demo
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
            >
              Admin Demo
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={() => handleDemoLogin('owner')}
              disabled={loading}
            >
              Owner Demo
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Demo credentials:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          User: user@example.com / password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Admin: admin@example.com / password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Owner: owner@example.com / password
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
