import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationContextState {
  message: string;
  type: NotificationType;
  isVisible: boolean;
  showNotification: (message: string, type?: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextState | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const hideNotification = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  }, []);

  const showNotification = useCallback((msg: string, notificationType: NotificationType = 'success') => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(msg);
    setType(notificationType);
    setIsVisible(true);

    timeoutRef.current = window.setTimeout(() => {
      hideNotification();
    }, 4000); // Auto-hide after 4 seconds
  }, [hideNotification]);

  const value = {
    message,
    type,
    isVisible,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
