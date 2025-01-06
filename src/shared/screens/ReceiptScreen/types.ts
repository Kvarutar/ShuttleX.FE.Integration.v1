import { type LatLng } from 'react-native-maps';

export type ReceiptScreenProps = {
  onClose: () => void;
  totalDistanceMtr: number;
  pickUpAddress: string;
  dropOffAddress: string;
  isTripCanceled: boolean;
  startPoint: LatLng;
  endPoint: LatLng;
  geometry: string;
  tripPrice: string;
  contractorName?: string;
  carNumber?: string;
  pickUpDate?: string;
  finishedDate?: string;
  ticket?: string;
};
