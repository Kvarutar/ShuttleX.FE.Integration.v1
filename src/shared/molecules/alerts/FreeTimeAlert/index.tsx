import { StyleSheet } from 'react-native';

import Text from '../../../atoms/Text';
import ClockIcon2 from '../../../icons/ClockIcon2';
import AlertV1 from '../Alert/V1';
import { type AlertDescendantProps } from '../Alert/V1/props';
import { type FreeTimeAlertProps } from './props';

const FreeTimeAlert = ({ text, style, ...props }: FreeTimeAlertProps & AlertDescendantProps) => (
  <AlertV1 style={[styles.container, style]} {...props}>
    <ClockIcon2 />
    <Text style={styles.text}>{text}</Text>
  </AlertV1>
);

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  text: {
    flexShrink: 1,
  },
});

export default FreeTimeAlert;
