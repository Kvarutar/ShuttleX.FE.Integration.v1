export type ContentProps = {
  time: number;
  headerFirstText: string;
  headerSecondText: string;
  onCodeChange: (code: string) => void;
  onButtonPress: () => void;
  isError?: boolean;
  underButtonText?: string;
  underButtonPressableText?: string;
  onPressUnderButtonText?: () => void;
};

export type ContentRef = {
  refresh: () => void;
};
