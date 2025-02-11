import { type LatLng } from 'react-native-maps';

export type ReceiptScreenProps = {
  totalDistanceMtr: number;
  pickUpAddress: string;
  dropOffAddress: string;
  isTripCanceled: boolean;
  tripPrice: string;
  startPoint: LatLng;
  endPoint: LatLng;
  geometries: string[];
  onClose: () => void;
  contractorName?: string;
  carNumber?: string;
  pickUpDate?: string;
  finishedDate?: string;
  ticket?: string;
};
