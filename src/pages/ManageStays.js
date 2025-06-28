import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, Button, Box, Chip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function ManageStays() {
  const { getStayRequests, updateStayRequest } = useAuth();
  const [requests, setRequests] = useState([]);

  const refresh = () => {
    setRequests(getStayRequests());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDecision = (id, status) => {
    updateStayRequest(id, status);
    refresh();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Stay Requests
        </Typography>
        <List>
          {requests.map(req => (
            <ListItem key={req.id} divider>
              <ListItemText primary={`${req.monkEmail}: ${req.from} - ${req.to}`} />
              <Chip label={req.status} sx={{ mr: 1 }} />
              {req.status === 'pending' && (
                <Box>
                  <Button size="small" color="success" onClick={() => handleDecision(req.id, 'approved')}>Approve</Button>
                  <Button size="small" color="error" onClick={() => handleDecision(req.id, 'rejected')}>Reject</Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ManageStays;
