export type CodeVerificationScreenProps = {
  headerFirstText: string;
  headerSecondText: string;
  onBackButtonPress: () => void;
  onAgainButtonPress: () => void;
  onCodeChange: (code: string) => void;
  isError?: boolean;
  isBlocked: boolean;
  lockOutTime: number;
  lockOutTimeForText: string;
  onBannedAgainButtonPress: () => void;
  onSupportButtonPress: () => void;
};
