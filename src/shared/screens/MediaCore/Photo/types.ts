import { type Asset } from 'react-native-image-picker';

export enum PhotoType {
  Circle = 'circle',
  Default = 'default',
}

export type PhotoProps = {
  asset: Asset;
  onCloseButtonPress: () => void;
  type: PhotoType;
};
