import { type DocumentPickerResponse } from 'react-native-document-picker';

export type DocumentProps = {
  selectedDocument: DocumentPickerResponse;
  onCloseButtonPress: () => void;
};
