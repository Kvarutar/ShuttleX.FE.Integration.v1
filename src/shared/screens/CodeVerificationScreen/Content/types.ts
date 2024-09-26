export type ContentProps = {
  time: number;
  headerFirstText: string;
  headerSecondText: string;
  onCodeChange: (code: string) => void;
  onButtonPress: () => void;
  isError?: boolean;
};
