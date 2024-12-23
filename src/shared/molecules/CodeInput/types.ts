export type CodeInputProps = {
  onCodeChange: (text: string) => void;
  isError?: boolean;
};

export type CodeInputRef = {
  cleanFields: () => void;
};
