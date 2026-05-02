import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  created_at?: string;
  viewed: boolean;
}

// API response interface - flexible to handle different field names
interface ApiNotification {
  ID?: string;
  id?: string;
  Type?: string;
  type?: string;
  Title?: string;
  title?: string;
  Message?: string;
  message?: string;
  Timestamp?: string;
  timestamp?: string;
  createdAt?: string;
  created_at?: string;
}

// Map API response to internal format
const mapApiNotification = (apiNotif: any): Notification => ({
  id: apiNotif.ID || apiNotif.id || `notification-${Date.now()}-${Math.random()}`,
  title: apiNotif.Type || apiNotif.type || apiNotif.Title || apiNotif.title || 'Unknown',
  message: apiNotif.Message || apiNotif.message || 'No message available',
  notification_type: apiNotif.Type || apiNotif.type || 'Unknown',
  created_at: apiNotif.Timestamp || apiNotif.timestamp || apiNotif.createdAt || apiNotif.created_at,
  viewed: false
});

export interface FetchNotificationsParams {
  limit?: number;
  page?: number;
  notification_type?: string;
}

export function useNotifications(params: FetchNotificationsParams = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setLoading(true);
    setError(null);
    const url = new URL('/api/proxy', window.location.origin);
    
    const validParams = {
      ...params,
      limit: params.limit ? Math.max(params.limit, 5) : undefined,
    };
    
    const apiLimit = Math.min(validParams.limit || 10, 10);
    url.searchParams.append('limit', apiLimit.toString());
    if (validParams.page) url.searchParams.append('page', validParams.page.toString());
    if (validParams.notification_type) url.searchParams.append('notification_type', validParams.notification_type);

    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlha3NoYXlhX2tvZGFsaUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDk4MDEsImlhdCI6MTc3NzcwODkwMSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQzNzgzMTY5LWY1ODgtNDdjNC1hMWI3LWQ2N2YzODE2NjlkNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFsaSBzcmkgYWtzaGF5YSIsInN1YiI6Ijk1MjcxM2EzLThkYmEtNDM3Zi04NmE1LTc5NjkwNzFkOGY5OSJ9LCJlbWFpbCI6InNyaWFrc2hheWFfa29kYWxpQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJrb2RhbGkgc3JpIGFrc2hheWEiLCJyb2xsTm8iOiJhcDIzMTEwMDExMTYzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiOTUyNzEzYTMtOGRhYS00MzdmLTg2YTUtNzk2OTA3MWQ4Zjk5IiwiY2xpZW50U2VjcmV0Ijoia2pzUkpVRllNS013clZ3VyJ9.3F39rKTx0YUAxDlExf6qELG2XssOhJCUHZ2ykriqDuI';

    fetch(url.toString(), {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch notifications (${res.status}): ${errorText}`);
        }
        
        const data = await res.json();
        
        // Handle different API response structures
        let notifications = [];
        if (Array.isArray(data)) {
          notifications = data;
        } else if (data.data && Array.isArray(data.data)) {
          notifications = data.data;
        } else if (data.notifications && Array.isArray(data.notifications)) {
          notifications = data.notifications;
        } else if (data.results && Array.isArray(data.results)) {
          notifications = data.results;
        }
        
        const mappedNotifications = notifications
          .slice(0, validParams.limit || notifications.length)
          .map(mapApiNotification);
        setNotifications(mappedNotifications);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [params.limit, params.page, params.notification_type]);

  return { notifications, loading, error };
}
