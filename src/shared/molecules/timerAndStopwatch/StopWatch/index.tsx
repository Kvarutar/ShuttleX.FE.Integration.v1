import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../../core/themes/themeContext';
import Bar from '../../../atoms/Bar';
import ClockIcon from '../../../icons/ClockIcon';
import CountingComponent from '../CountingComponent';
import { type StopWatchProps } from './props';

const StopWatch = ({ initialDate, onAfterCountdownEnds, mask }: StopWatchProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.stopwatchWrapper}>
      <Bar style={styles.roundButton}>
        <ClockIcon style={[styles.clockIcon]} color={colors.iconPrimaryColor} />
        <CountingComponent initialDate={initialDate} mask={mask} onAfterCountdownEnds={onAfterCountdownEnds} />
      </Bar>
    </View>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  stopwatchWrapper: {
    alignSelf: 'flex-start',
  },
  clockIcon: {
    marginRight: 10,
  },
});

export default StopWatch;
