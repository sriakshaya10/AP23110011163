import React from 'react';
import { Notification } from '../utils/notifications';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'No date available';
  
  try {
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // Try parsing as Unix timestamp if it's a number
      if (!isNaN(Number(dateString))) {
        const timestampDate = new Date(Number(dateString));
        if (!isNaN(timestampDate.getTime())) {
          return timestampDate.toLocaleString();
        }
      }
      return 'Invalid date format';
    }
    return date.toLocaleString();
  } catch (error) {
    return 'Date parsing error';
  }
};

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onClick }) => {
  return (
    <Card
      variant={notification.viewed ? 'outlined' : 'elevation'}
      sx={{
        mb: 2,
        backgroundColor: notification.viewed ? '#f5f5f5' : '#e3f2fd',
        cursor: onClick ? 'pointer' : 'default',
        borderLeft: notification.viewed ? '4px solid #bdbdbd' : '4px solid #1976d2',
        transition: 'background 0.2s',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={notification.viewed ? 'normal' : 'bold'}>
            {notification.title}
          </Typography>
          <Chip label={notification.notification_type} color="primary" size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {notification.message}
        </Typography>
        <Typography variant="caption" color="text.secondary" mt={2} display="block">
          {formatDate(notification.created_at)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
