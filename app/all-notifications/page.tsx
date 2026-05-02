"use client";
import React, { useState, useEffect } from 'react';
import { useNotifications, Notification } from '../../utils/notifications';
import NotificationCard from '../../components/NotificationCard';
import { Container, Typography, CircularProgress, Alert, Box, Button } from '@mui/material';

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

export default function AllNotificationsPage() {
  const { notifications, loading, error } = useNotifications();
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

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3} align="center">
        All Notifications
      </Typography>
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
