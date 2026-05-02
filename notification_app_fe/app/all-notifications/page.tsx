"use client";
import React, { useState, useEffect } from 'react';
import { useNotifications, Notification } from '../../utils/notifications';
import NotificationCard from '../../components/NotificationCard';

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

  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center'
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '2rem'
  };

  const errorStyle: React.CSSProperties = {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  };

  const noDataStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#666',
    padding: '2rem'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>All Notifications</h1>
      {loading && <div style={loadingStyle}>Loading...</div>}
      {error && <div style={errorStyle}>Error: {error}</div>}
      {!loading && !error && notifications.length === 0 && (
        <div style={noDataStyle}>No notifications found.</div>
      )}
      {!loading && !error && notifications.map((n: Notification, index: number) => (
        <NotificationCard
          key={n.id || `notification-${index}`}
          notification={{ ...n, viewed: n.id ? viewed.includes(n.id) : false }}
          onClick={() => n.id && handleMarkAsViewed(n.id)}
        />
      ))}
    </div>
  );
}
