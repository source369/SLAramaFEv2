import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Container, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function MyStays() {
  const { getStayRequests, currentUser } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const all = getStayRequests();
    setRequests(all.filter(r => r.monkEmail === currentUser.email));
  }, [getStayRequests, currentUser]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          My Stay Requests
        </Typography>
        <List>
          {requests.map(r => (
            <ListItem key={r.id} divider>
              <ListItemText primary={`${r.from} - ${r.to}`} />
              <Chip label={r.status} color={r.status === 'approved' ? 'success' : r.status === 'rejected' ? 'error' : 'default'} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default MyStays;
