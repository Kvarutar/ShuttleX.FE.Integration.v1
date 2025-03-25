export type DatePickerPopupProps = {
  isVisible: boolean;
  onVisibilityChange: (isVisible: boolean) => void;
  onDateSelected: ({ date, time }: { date: Date; time: Date }) => void;
};
