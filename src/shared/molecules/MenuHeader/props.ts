import { type ReactNode } from 'react';

export type MenuHeaderTypes = {
  onMenuPress: () => void;
  onNotificationPress: () => void;
  children?: ReactNode;
};
