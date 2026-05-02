"use client";
import React, { useState, useEffect } from 'react';
import { useNotifications, Notification } from '../../utils/notifications';
import NotificationCard from '../../components/NotificationCard';
import { Container, Typography, CircularProgress, Alert, Box, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

const LOCAL_STORAGE_KEY = 'viewed_notifications';

function getViewedNotifications(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function setViewedNotifications(ids: string[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
}

const NOTIFICATION_TYPES = [
  'Event',
  'Result',
  'Placement',
];

const LIMIT_OPTIONS = [5, 10, 15, 20];

export default function PriorityNotificationsPage() {
  const [limit, setLimit] = useState<number>(5);
  const [notificationType, setNotificationType] = useState<string>('');
  const { notifications, loading, error } = useNotifications({ limit, notification_type: notificationType });
  const [viewed, setViewed] = useState<string[]>(getViewedNotifications());

  useEffect(() => {
    setViewed(getViewedNotifications());
  }, [notifications]);

  const handleMarkAsViewed = (id: string) => {
    if (!viewed.includes(id)) {
      const updated = [...viewed, id];
      setViewedNotifications(updated);
      setViewed(updated);
    }
  };

  const handleLimitChange = (value: number) => {
    // Accept any limit option (5, 10, 15, 20)
    setLimit(value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} align="center">
        Priority Notifications
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", justifyContent: "center" }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value={notificationType}
            label="Type"
            onChange={e => setNotificationType(e.target.value)}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            {NOTIFICATION_TYPES.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 80 }} size="small">
          <InputLabel id="limit-label">Limit</InputLabel>
          <Select
            labelId="limit-label"
            value={limit}
            label="Limit"
            onChange={e => handleLimitChange(Number(e.target.value))}
          >
            {LIMIT_OPTIONS.map(limitOption => (
              <MenuItem key={limitOption} value={limitOption}>{limitOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {loading && <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && notifications.length === 0 && (
        <Typography align="center" color="text.secondary">No notifications found.</Typography>
      )}
      {!loading && !error && notifications.map((n: Notification, index: number) => (
        <NotificationCard
          key={n.id || `notification-${index}`}
          notification={{ ...n, viewed: n.id ? viewed.includes(n.id) : false }}
          onClick={() => n.id && handleMarkAsViewed(n.id)}
        />
      ))}
    </Container>
  );
}
