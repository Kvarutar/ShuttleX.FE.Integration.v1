import { type ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { type DocumentPickerResponse } from 'react-native-document-picker';
import { type Asset } from 'react-native-image-picker';

import sizes from '../../../core/themes/sizes';

export enum MediaFileType {
  Photo = 'photo',
  Document = 'document',
  All = 'all',
}

export enum MediaAmount {
  Multiple = 'multiple',
  Single = 'single',
}

export type FileInfo = { name: string; type: string; uri: string };

type OnSaveCallback = (files: FileInfo[]) => void;

export type MediaCoreProps = {
  goBack: () => void;
  windowTitle: string;
  firstHeaderTitle: string;
  secondHeaderTitle: string;
  headerDescription: string;
  onSaveFiles: OnSaveCallback;
  mediaAmount?: MediaAmount;
  cropperCircleOverlay?: boolean;
  children?: ReactNode;
};

export const mediaConsts = {
  cropTimeOut: 500,
  fadeAnimationDuration: 200,
  photoMaxWidth: Dimensions.get('window').width - sizes.paddingVertical * 2,
  photoMaxHeight: 375,
  circlePhotoSize: 375,
};

type PhotoAsset = {
  type: MediaFileType.Photo;
  body: Asset;
};
type SelectedDocument = {
  type: MediaFileType.Document;
  body: DocumentPickerResponse;
};

export type SelectedFile = PhotoAsset | SelectedDocument;
