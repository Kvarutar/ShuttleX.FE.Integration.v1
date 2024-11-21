import { PhotoType } from '../Photo/types';
import { type SelectedFile } from '../types';

export type SelectedFileProps = {
  onTakePhoto: () => void;
  onCloseFile: (fileUri?: string) => void;
  selectedFiles: SelectedFile[];
  photoType: PhotoType;
};
