import { type ReactNode } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

export enum LinkedWrapperShadows {
  Weak = 'weak',
  Strong = 'strong',
}

export type LinkedWrapperProps = {
  data: {
    element: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    color?: string | number;
    shape?: 'circle' | 'square';
  }[];
  wrapperStyle?: StyleProp<Omit<ViewStyle, 'flexDirection' | 'alignItems'>>;
  flexDirection?: 'column' | 'row';
  withShadow?: LinkedWrapperShadows;
};

export type LinkedWrapperElementLayoutType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ShadowOptionsType = {
  offset: Record<string, [number, number]>;
  extraShadowStyle: {
    height: number;
    width: number;
  };
};
