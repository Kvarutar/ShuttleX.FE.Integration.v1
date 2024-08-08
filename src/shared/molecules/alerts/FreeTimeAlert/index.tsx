import { StyleSheet } from 'react-native';

import Text from '../../../atoms/Text';
import ClockIcon2 from '../../../icons/ClockIcon2';
import Alert from '../Alert';
import { type AlertDescendantProps } from '../Alert/props';
import { type FreeTimeAlertProps } from './props';

const FreeTimeAlert = ({ text, style, ...props }: FreeTimeAlertProps & AlertDescendantProps) => (
  <Alert style={[styles.container, style]} {...props}>
    <ClockIcon2 />
    <Text style={styles.text}>{text}</Text>
  </Alert>
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
