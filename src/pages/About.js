import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Devices as DevicesIcon,
  Build as BuildIcon,
} from '@mui/icons-material';

function About() {
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        About SLArama
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to SLArama
        </Typography>
        <Typography variant="body1" paragraph>
          SLArama is a comprehensive dashboard application designed to help organizations manage their operations
          efficiently. Our platform provides role-based access controls to ensure that users can access
          the information and tools they need based on their responsibilities within the organization.
        </Typography>
        <Typography variant="body1">
          Whether you're a general user looking to track your tasks, an administrator managing the system,
          or an owner overseeing the entire organization, SLArama provides the right interface and
          tools to make your job easier and more productive.
        </Typography>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Key Features
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <SecurityIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Secure Access
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Role-based access control ensures users can only access what they're authorized to see.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <SpeedIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Performance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Optimized for speed, SLArama ensures a smooth experience even with large data sets.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <DevicesIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Responsive Design
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Access SLArama from any device - desktop, tablet, or mobile - with a consistent experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <BuildIcon fontSize="large" color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                Customizable
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tailor the dashboard to your needs with customizable widgets and settings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>
        User Roles
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <DevicesIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="General User"
              secondary="Access to personal dashboard, tasks, and basic features. Perfect for team members who need to track their work and collaborate."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <BuildIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Administrator"
              secondary="Extended access with user management capabilities, system configurations, and monitoring tools. Ideal for team leaders and managers."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Owner"
              secondary="Complete access to all features, including business metrics, organization settings, and strategic planning tools. Designed for executives and business owners."
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Technology Stack
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Frontend
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="React.js" secondary="JavaScript library for building user interfaces" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Material-UI" secondary="React components for faster development" />
              </ListItem>
              <ListItem>
                <ListItemText primary="React Router" secondary="Declarative routing for React applications" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Backend (Simulated)
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Node.js" secondary="JavaScript runtime for server-side applications" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Express" secondary="Web framework for Node.js" />
              </ListItem>
              <ListItem>
                <ListItemText primary="JWT" secondary="Secure authentication mechanism" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="500">
              Development Tools
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="npm" secondary="Package manager for JavaScript" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Git" secondary="Version control system" />
              </ListItem>
              <ListItem>
                <ListItemText primary="ESLint" secondary="JavaScript linting utility" />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} SLArama. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Version 2.0.0
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default About;
