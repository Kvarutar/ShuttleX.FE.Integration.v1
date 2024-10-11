import { type ReactNode } from 'react';

export type AlertType = {
  text: string;
  textColor: string;
  backgroundColor: string;
  icon?: ReactNode;
  isVisible: boolean;
};
