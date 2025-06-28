import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function Profile() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        My Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Profile details will appear here.
        </Typography>
      </Paper>
    </Box>
  );
}

export default Profile;
