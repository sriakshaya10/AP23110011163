import React from 'react';
import { Notification } from '../utils/notifications';

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return 'No date available';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
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
  const cardStyle: React.CSSProperties = {
    marginBottom: '16px',
    backgroundColor: notification.viewed ? '#f5f5f5' : '#e3f2fd',
    cursor: onClick ? 'pointer' : 'default',
    borderLeft: notification.viewed ? '4px solid #bdbdbd' : '4px solid #1976d2',
    padding: '16px',
    borderRadius: '8px',
    transition: 'background 0.2s',
    boxShadow: notification.viewed ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
  };

  const titleStyle: React.CSSProperties = {
    margin: '0 0 8px 0',
    fontWeight: notification.viewed ? 'normal' : 'bold',
    color: '#333'
  };

  const messageStyle: React.CSSProperties = {
    margin: '0 0 8px 0',
    color: '#666',
    fontSize: '14px'
  };

  const dateStyle: React.CSSProperties = {
    margin: '0',
    color: '#999',
    fontSize: '12px'
  };

  const typeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: '#1976d2',
    color: 'white',
    borderRadius: '12px',
    fontSize: '12px',
    float: 'right'
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={titleStyle}>{notification.title}</h3>
        <span style={typeStyle}>{notification.notification_type}</span>
      </div>
      <p style={messageStyle}>{notification.message}</p>
      <p style={dateStyle}>{formatDate(notification.created_at)}</p>
      <div style={{ clear: 'both' }}></div>
    </div>
  );
};

export default NotificationCard;
