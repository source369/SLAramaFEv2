import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  AssignmentTurnedIn as AssignmentIcon,
  People as PeopleIcon,
  LocalOffer as TagIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Mock data for the dashboard
const stats = {
  totalUsers: 1284,
  activeUsers: 842,
  completedTasks: 76,
  pendingTasks: 23,
  revenue: 28450,
  lastMonth: 24320,
};

const recentActivity = [
  { id: 1, action: 'New user registered', time: '5 minutes ago', user: 'John Doe', type: 'user' },
  { id: 2, action: 'Task completed', time: '10 minutes ago', user: 'Jane Smith', type: 'task' },
  { id: 3, action: 'Server error reported', time: '25 minutes ago', user: 'System', type: 'error' },
  { id: 4, action: 'New feature deployed', time: '1 hour ago', user: 'Admin', type: 'system' },
  { id: 5, action: 'Database backup completed', time: '2 hours ago', user: 'System', type: 'system' },
];

const AdminStatCard = ({ title, value, icon, color, subtext }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ my: 1, fontWeight: 500 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtext}
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: `${color}.light`, p: 2, borderRadius: 2 }}>
        {icon}
      </Box>
    </CardContent>
  </Card>
);

function Dashboard() {
  const { currentUser, isResident, isChief } = useAuth();

  // Components for different roles
  const GeneralUserDashboard = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Welcome back, {currentUser?.name}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="My Tasks"
              action={
                <IconButton aria-label="refresh">
                  <RefreshIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Complete project documentation" 
                    secondary="Due in 2 days"
                  />
                  <Chip label="In Progress" color="warning" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Review team updates" 
                    secondary="Due tomorrow"
                  />
                  <Chip label="Pending" color="info" size="small" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Submit weekly report" 
                    secondary="Due today"
                  />
                  <Chip label="Urgent" color="error" size="small" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="My Stats" />
            <Divider />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Tasks Completed</Typography>
                <Typography variant="body1">8/12</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Projects Involved</Typography>
                <Typography variant="body1">4</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Hours Tracked</Typography>
                <Typography variant="body1">32h this week</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="Recent Activity" />
            <Divider />
            <CardContent>
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemIcon>
                      {activity.type === 'error' ? <ErrorIcon color="error" /> :
                       activity.type === 'task' ? <CheckCircleIcon color="success" /> :
                       activity.type === 'user' ? <PeopleIcon color="primary" /> :
                       <TimeIcon color="info" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={activity.action} 
                      secondary={`${activity.time} by ${activity.user}`} 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const AdminDashboard = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<PeopleIcon sx={{ color: 'primary.main' }} />}
            color="primary"
            subtext={`${stats.activeUsers} active users`}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Tasks" 
            value={`${stats.completedTasks}/${stats.completedTasks + stats.pendingTasks}`} 
            icon={<AssignmentIcon sx={{ color: 'success.main' }} />}
            color="success"
            subtext={`${stats.pendingTasks} tasks pending`}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Revenue" 
            value={`$${stats.revenue}`} 
            icon={<TrendingUpIcon sx={{ color: 'info.main' }} />}
            color="info"
            subtext={
              stats.revenue > stats.lastMonth ? 
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'success.main' }}>
                  {Math.round((stats.revenue - stats.lastMonth) / stats.lastMonth * 100)}% from last month
                </Typography>
              </Box> :
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {Math.round((stats.lastMonth - stats.revenue) / stats.lastMonth * 100)}% from last month
                </Typography>
              </Box>
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="System Status" 
            value="Healthy" 
            icon={<CheckCircleIcon sx={{ color: 'success.main' }} />}
            color="success"
            subtext="All systems operational"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader 
              title="Recent User Activity" 
              action={
                <IconButton aria-label="refresh">
                  <RefreshIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemIcon>
                      {activity.type === 'error' ? <ErrorIcon color="error" /> :
                       activity.type === 'task' ? <CheckCircleIcon color="success" /> :
                       activity.type === 'user' ? <PeopleIcon color="primary" /> :
                       <TimeIcon color="info" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={activity.action} 
                      secondary={`${activity.time} by ${activity.user}`} 
                    />
                    <Chip 
                      label={activity.type} 
                      color={
                        activity.type === 'error' ? 'error' :
                        activity.type === 'task' ? 'success' :
                        activity.type === 'user' ? 'primary' :
                        'default'
                      } 
                      size="small" 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="System Notifications" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Database backup completed" 
                    secondary="Today, 03:00 AM"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TagIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="New version released" 
                    secondary="Yesterday, 11:30 AM"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <ErrorIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Server load at 82%" 
                    secondary="Yesterday, 09:15 PM"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const OwnerDashboard = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Owner Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon={<PeopleIcon sx={{ color: 'primary.main' }} />}
            color="primary"
            subtext={`${stats.activeUsers} active users`}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Tasks" 
            value={`${stats.completedTasks}/${stats.completedTasks + stats.pendingTasks}`} 
            icon={<AssignmentIcon sx={{ color: 'success.main' }} />}
            color="success"
            subtext={`${stats.pendingTasks} tasks pending`}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Revenue" 
            value={`$${stats.revenue}`} 
            icon={<TrendingUpIcon sx={{ color: 'info.main' }} />}
            color="info"
            subtext={
              stats.revenue > stats.lastMonth ? 
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'success.main' }}>
                  {Math.round((stats.revenue - stats.lastMonth) / stats.lastMonth * 100)}% from last month
                </Typography>
              </Box> :
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'error.main' }}>
                  {Math.round((stats.lastMonth - stats.revenue) / stats.lastMonth * 100)}% from last month
                </Typography>
              </Box>
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <AdminStatCard 
            title="Business Health" 
            value="Excellent" 
            icon={<CheckCircleIcon sx={{ color: 'success.main' }} />}
            color="success"
            subtext="All metrics above target"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader 
              title="Business Performance" 
              action={
                <IconButton aria-label="refresh">
                  <RefreshIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  [Business Performance Chart Placeholder]
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Key Metrics" />
            <Divider />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Customer Acquisition Cost" 
                    secondary="$42.50"
                  />
                  <Chip 
                    label="-5%" 
                    color="success" 
                    size="small" 
                    icon={<ArrowDownwardIcon />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Customer Lifetime Value" 
                    secondary="$1,250.00"
                  />
                  <Chip 
                    label="+12%" 
                    color="success" 
                    size="small" 
                    icon={<ArrowUpwardIcon />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="User Retention Rate" 
                    secondary="87%"
                  />
                  <Chip 
                    label="+3%" 
                    color="success" 
                    size="small" 
                    icon={<ArrowUpwardIcon />}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Annual Recurring Revenue" 
                    secondary="$345,000"
                  />
                  <Chip 
                    label="+18%" 
                    color="success" 
                    size="small" 
                    icon={<ArrowUpwardIcon />}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  // Render dashboard based on user role
  return (
    <Box sx={{ py: 2 }}>
      {isChief ? (
        <OwnerDashboard />
      ) : isResident ? (
        <AdminDashboard />
      ) : (
        <GeneralUserDashboard />
      )}
    </Box>
  );
}

export default Dashboard;
