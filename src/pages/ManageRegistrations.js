import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function ManageRegistrations() {
  const { getRegistrationRequests, approveRegistration } = useAuth();
  const [requests, setRequests] = useState([]);

  const refresh = () => {
    setRequests(getRegistrationRequests());
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDecision = (id, approved) => {
    approveRegistration(id, approved);
    refresh();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Registration Requests
        </Typography>
        <List>
          {requests.map(req => (
            <ListItem key={req.id} divider>
              <ListItemText primary={req.name} secondary={`${req.email} - ${req.passport}/${req.issuingCountry}`} />
              <Box>
                <Button size="small" color="success" onClick={() => handleDecision(req.id, true)}>Approve</Button>
                <Button size="small" color="error" onClick={() => handleDecision(req.id, false)}>Reject</Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default ManageRegistrations;
