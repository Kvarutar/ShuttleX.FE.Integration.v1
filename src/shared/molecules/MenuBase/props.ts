import { type ReactNode } from 'react';

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
  userImage?: string;
  userName?: string;
  userSurname?: string;
  additionalContent?: ReactNode;
};
