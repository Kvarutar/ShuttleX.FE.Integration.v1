import { type ReactNode } from 'react';
import { type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { type ShadowProps } from 'react-native-shadow-2';

export enum BarModes {
  Active = 'active',
  Default = 'default',
  Disabled = 'disabled',
}

export type BarProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  mode?: BarModes;
  disableShadow?: boolean;
};

type BarStylesTypeV1 = {
  shadowProps: ShadowProps;
  strokeProps: ViewStyle;
  backgroundColor: string;
};

export type BarPropertiesTypeV1 = Record<BarModes, BarStylesTypeV1>;

type BarStylesType = {
  strokeProps: ViewStyle;
  backgroundColor: string;
};

export type BarPropertiesType = Record<BarModes, BarStylesType>;

export type BarPressableProps = Omit<PressableProps, 'style' | 'children'>;
