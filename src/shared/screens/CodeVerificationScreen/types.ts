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
  titleText?: string;
  onBannedAgainButtonPress: () => void;
  onSupportButtonPress: () => void;
  underButtonText?: string;
  underButtonPressableText?: string;
  onPressUnderButtonText?: () => void;
};

export type CodeVerificationScreenRef = {
  refresh: () => void;
};
