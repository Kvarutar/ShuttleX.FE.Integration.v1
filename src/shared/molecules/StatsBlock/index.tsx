import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
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

const StatsBlockWithoutI18n = ({ amountLikes, amountRides, style }: StatsBlockProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

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
    <I18nextProvider i18n={i18nIntegration}>
      <View style={[styles.container, style]}>
        <Like2Icon color={colors.iconSecondaryColor} />
        <StatsTextBlock amount={formatStats(amountLikes)} text={t('StatsBlock_likes')} />
        {amountRides !== undefined && (
          <>
            <View style={[styles.separateCircle, computedStyles.separateCircle]} />
            <SteeringWheelIcon color={colors.iconSecondaryColor} />
            <StatsTextBlock amount={formatStats(amountRides)} text={t('StatsBlock_rides')} />
          </>
        )}
      </View>
    </I18nextProvider>
  );
};

const StatsBlock = (props: StatsBlockProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <StatsBlockWithoutI18n {...props} />
  </I18nextProvider>
);

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
