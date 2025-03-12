import { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNotificationStore } from '../hooks/notificationStore';

export const NotificationProvider = () => {
  const { isOpen, message, severity, autoHideDuration, hideNotification } =
    useNotificationStore();

  // 컴포넌트 언마운트 시 알림 초기화 (선택 사항)
  useEffect(() => {
    return () => {
      if (isOpen) {
        hideNotification();
      }
    };
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    hideNotification();
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
