import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/v2/themeContext';
import Text from '../../atoms/Text';
import Like2Icon from '../../icons/Like2Icon';
import SteeringWheelIcon from '../../icons/SteeringWheelIcon';
import { type StatsBlockProps, type StatsTextBlockProps } from './props';

const StatsTextBlock = ({ amount, text }: StatsTextBlockProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    text: {
      color: colors.textTitleColor,
    },
    amount: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <>
      <Text style={[styles.text, computedStyles.amount]}> {amount} </Text>
      <Text style={[styles.text, computedStyles.text]}>{text}</Text>
    </>
  );
};

const StatsBlock = ({ textLikes, amountLikes, textRides, amountRides, style }: StatsBlockProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    separateCircle: {
      backgroundColor: colors.iconSecondaryColor,
    },
  });

  const formatStats = (number: number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1).replace('.0', '') + 'm';
    }

    if (number >= 1000) {
      return (number / 1000).toFixed(1).replace('.0', '') + 'k';
    }

    return number.toString();
  };

  return (
    <View style={[styles.container, style]}>
      <Like2Icon color={colors.iconSecondaryColor} />
      <StatsTextBlock amount={formatStats(amountLikes)} text={textLikes} />
      {textRides && amountRides && (
        <>
          <View style={[styles.separateCircle, computedStyles.separateCircle]} />
          <SteeringWheelIcon color={colors.iconSecondaryColor} />
          <StatsTextBlock amount={formatStats(amountRides)} text={textRides} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Inter Medium',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separateCircle: {
    borderRadius: 100,
    width: 4,
    height: 4,
    marginHorizontal: 6,
  },
});

export default StatsBlock;
