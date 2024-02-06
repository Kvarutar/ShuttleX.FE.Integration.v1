export type LocationUnavailableProps = {
  reason: 'permission_denied' | 'location_disabled' | 'accuracy_reduced';
  onButtonPress: () => void;
};
