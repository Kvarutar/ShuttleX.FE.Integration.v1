import { StyleSheet, View } from 'react-native';

import { useThemeV1 } from '../../../../core/themes/v1/themeContext';
import BarV1 from '../../../atoms/Bar/v1';
import ClockIcon from '../../../icons/ClockIcon';
import CountingComponent from '../CountingComponent';
import { type StopWatchProps } from './props';

const StopWatch = ({ initialDate, onAfterCountdownEnds, mask }: StopWatchProps) => {
  const { colors } = useThemeV1();

  return (
    <View style={styles.stopwatchWrapper}>
      <BarV1 style={styles.roundButton}>
        <ClockIcon style={[styles.clockIcon]} color={colors.iconPrimaryColor} />
        <CountingComponent initialDate={initialDate} mask={mask} onAfterCountdownEnds={onAfterCountdownEnds} />
      </BarV1>
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
