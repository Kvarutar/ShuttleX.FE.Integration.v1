export type TemporaryLockoutPopupProps = {
  lockOutTime?: number;
  lockOutTimeText: string;
  onBannedAgainButtonPress?: () => void;
  onSupportButtonPress: () => void;
};
