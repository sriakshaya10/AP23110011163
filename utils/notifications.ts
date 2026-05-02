import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  notification_type: string;
  created_at?: string;
  viewed: boolean;
}

// API response interface
interface ApiNotification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

// Map API response to internal format
const mapApiNotification = (apiNotif: ApiNotification): Notification => ({
  id: apiNotif.ID,
  title: apiNotif.Type, // API uses Type as title
  message: apiNotif.Message,
  notification_type: apiNotif.Type,
  created_at: apiNotif.Timestamp,
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
    setLoading(true);
    setError(null);
    // Use local Next.js API proxy to avoid CORS issues in development
    const url = new URL('/api/proxy', window.location.origin);
    
    // Validate and sanitize parameters (accept 5, 10, 15, 20)
    const validParams = {
      ...params,
      limit: params.limit ? Math.max(params.limit, 5) : undefined,
    };
    
    // Always use limit=10 for API calls, we'll handle client-side limiting
    const apiLimit = Math.min(validParams.limit || 10, 10);
    url.searchParams.append('limit', apiLimit.toString());
    if (validParams.page) url.searchParams.append('page', validParams.page.toString());
    if (validParams.notification_type) url.searchParams.append('notification_type', validParams.notification_type);
    
    
    // Forward Authorization header to proxy which will call the external API
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzcmlha3NoYXlhX2tvZGFsaUBzcm1hcC5lZHUuaW4iLCJleHAiOjE3Nzc3MDY5ODksImlhdCI6MTc3NzcwNjA4OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjAxYmQ0ZGEzLTlkNWEtNDg2Ni05ZWYzLTZjODM5ZmJkOTgwYyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImtvZGFsaSBzcmkgYWtzaGF5YSIsInN1YiI6Ijk1MjcxM2EzLThkYmEtNDM3Zi04NmE1LTc5NjkwNzFkOGY5OSJ9LCJlbWFpbCI6InNyaWFrc2hheWFfa29kYWxpQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJrb2RhbGkgc3JpIGFrc2hheWEiLCJyb2xsTm8iOiJhcDIzMTEwMDExMTYzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiOTUyNzEzYTMtOGRiYS00MzdmLTg2YTUtNzk2OTA3MWQ4Zjk5IiwiY2xpZW50U2VjcmV0Ijoia2pzUkpVRllNS013clZ3VyJ9.wqU_iKCEJo2uAAG-OzhySeqrZ8Hpkz7NHEMMsyJAExQ';

    fetch(url.toString(), {
      headers: {
        Authorization: token,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        
        // Map API notifications to internal format
        const mappedNotifications = (data.notifications || [])
          .slice(0, validParams.limit || data.notifications.length)
          .map(mapApiNotification);
        setNotifications(mappedNotifications);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.limit, params.page, params.notification_type]);

  return { notifications, loading, error };
}
