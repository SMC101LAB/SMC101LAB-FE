import { create } from 'zustand';
import { AlertColor } from '@mui/material/Alert';

interface NotificationState {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  autoHideDuration: number | null;
  showNotification: (
    message: string,
    options?: {
      severity?: AlertColor;
      autoHideDuration?: number | null;
    }
  ) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isOpen: false,
  message: '',
  severity: 'info',
  autoHideDuration: 4000,

  showNotification: (message, options = {}) =>
    set({
      isOpen: true,
      message,
      severity: options.severity || 'info',
      autoHideDuration:
        options.autoHideDuration !== undefined
          ? options.autoHideDuration
          : 4000,
    }),

  hideNotification: () => set({ isOpen: false }),
}));
