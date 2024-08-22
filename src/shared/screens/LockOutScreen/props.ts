export type LockOutScreenProps = {
  onRequestCodeAgain: () => void;
  onContactSupport: () => void;
  lockoutEndTimestamp: number;
  isLockedOut: boolean;
  onAfterCountdownEnds: () => void;
};
