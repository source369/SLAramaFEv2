import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { useAuth } from './contexts/AuthContext';

// Components
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import About from './pages/About';
import Register from './pages/Register';
import StayRequest from './pages/StayRequest';
import MyStays from './pages/MyStays';
import ManageRegistrations from './pages/ManageRegistrations';
import ManageStays from './pages/ManageStays';

function App() {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/" element={!currentUser ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stay-request" element={<StayRequest />} />
          <Route path="/my-stays" element={<MyStays />} />
          <Route path="/manage-registrations" element={<ManageRegistrations />} />
          <Route path="/manage-stays" element={<ManageStays />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
