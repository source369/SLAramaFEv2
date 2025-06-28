import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const { currentUser, isAdmin, isOwner } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    setSuccessMessage('Profile updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    // In a real app, this would update the user's password
    setSuccessMessage('Password updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    // In a real app, this would update notification settings
    setSuccessMessage('Notification settings updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveAppearance = (e) => {
    e.preventDefault();
    // In a real app, this would update appearance settings
    setSuccessMessage('Appearance settings updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Settings
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Profile" />
            <Tab label="Password" />
            <Tab label="Notifications" />
            <Tab label="Appearance" />
            {(isAdmin || isOwner) && <Tab label="System" />}
            {isOwner && <Tab label="Organization" />}
          </Tabs>
        </Box>

        {/* Profile Settings */}
        <TabPanel value={tabValue} index={0}>
          <Box component="form" onSubmit={handleSaveProfile}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  defaultValue={currentUser?.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  defaultValue={currentUser?.email}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Password Settings */}
        <TabPanel value={tabValue} index={1}>
          <Box component="form" onSubmit={handleSavePassword}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Update Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel value={tabValue} index={2}>
          <Box component="form" onSubmit={handleSaveNotifications}>
            <Typography variant="h6" gutterBottom>
              Email Notifications
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Task assignments"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Project updates"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Security alerts"
            />
            <FormControlLabel
              control={<Switch />}
              label="Marketing communications"
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              System Notifications
            </Typography>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="New features and updates"
            />
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Maintenance notices"
            />

            <Box sx={{ mt: 3 }}>
              <Button type="submit" variant="contained">
                Save Notification Settings
              </Button>
            </Box>
          </Box>
        </TabPanel>

        {/* Appearance Settings */}
        <TabPanel value={tabValue} index={3}>
          <Box component="form" onSubmit={handleSaveAppearance}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="theme-select-label">Theme</InputLabel>
                  <Select
                    labelId="theme-select-label"
                    defaultValue="light"
                    label="Theme"
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System Default</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="density-select-label">Density</InputLabel>
                  <Select
                    labelId="density-select-label"
                    defaultValue="standard"
                    label="Density"
                  >
                    <MenuItem value="compact">Compact</MenuItem>
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="comfortable">Comfortable</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show animations"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Save Appearance Settings
                </Button>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        {/* System Settings (Admin & Owner only) */}
        {(isAdmin || isOwner) && (
          <TabPanel value={tabValue} index={4}>
            <Typography variant="h6" gutterBottom>
              System Configuration
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              These settings affect the entire system and all users.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="log-level-label">Log Level</InputLabel>
                  <Select
                    labelId="log-level-label"
                    defaultValue="info"
                    label="Log Level"
                  >
                    <MenuItem value="debug">Debug</MenuItem>
                    <MenuItem value="info">Info</MenuItem>
                    <MenuItem value="warning">Warning</MenuItem>
                    <MenuItem value="error">Error</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Session Timeout (minutes)"
                  defaultValue="30"
                  type="number"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable user registration"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable system-wide notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Save System Settings
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        )}

        {/* Organization Settings (Owner only) */}
        {isOwner && (
          <TabPanel value={tabValue} index={5}>
            <Typography variant="h6" gutterBottom>
              Organization Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Configure your organization-wide settings and policies.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Organization Name"
                  defaultValue="SLArama Corporation"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Organization ID"
                  defaultValue="SLA-12345"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Address"
                  multiline
                  rows={3}
                  defaultValue="123 Business Ave\nSuite 500\nEnterprise City, EC 12345"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Support Email"
                  defaultValue="support@slarama.com"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Support Phone"
                  defaultValue="+1 (555) 123-4567"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Enable SSO Integration"
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary">
                  Save Organization Settings
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        )}
      </Paper>
    </Box>
  );
}

export default Settings;
