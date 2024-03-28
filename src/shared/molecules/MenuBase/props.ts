import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export type MenuNavigationBlocks = 'wallet' | 'notifications' | 'help' | 'subscription' | 'becomeDriver';

export type MenuNavigationContent = {
  navFunc: () => void;
  title: string;
  content?: ReactNode;
};

export type MenuNavigation = Partial<Record<MenuNavigationBlocks, MenuNavigationContent>>;

export type MenuBaseProps = {
  onClose: () => void;
  menuNavigation: MenuNavigation;
  userImageUri?: string;
  userName?: string;
  userSurname?: string;
  additionalContent?: ReactNode;
  style?: StyleProp<ViewStyle>;
};
