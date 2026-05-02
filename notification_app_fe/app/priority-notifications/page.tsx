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
    setLimit(value);
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

  const controlsStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  const selectStyle: React.CSSProperties = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.25rem',
    fontWeight: 'bold',
    color: '#333'
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
      <h1 style={titleStyle}>Priority Notifications</h1>
      <div style={controlsStyle}>
        <div>
          <label style={labelStyle}>Type</label>
          <select 
            style={selectStyle}
            value={notificationType} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNotificationType(e.target.value)}
          >
            <option value="">All</option>
            {NOTIFICATION_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Limit</label>
          <select 
            style={selectStyle}
            value={limit} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleLimitChange(Number(e.target.value))}
          >
            {LIMIT_OPTIONS.map(limitOption => (
              <option key={limitOption} value={limitOption}>{limitOption}</option>
            ))}
          </select>
        </div>
      </div>
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
