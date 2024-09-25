import { StyleSheet, View } from 'react-native';
import { Bar, BarModes, getPaymentIcon, PlusInCircleIcon, RoundCheckIcon4, Text, useTheme } from 'shuttlex-integration';

import { type PaymentBarProps } from './props';

const PaymentBar = ({
  style,
  method,
  selected,
  onPress,
  squareShape,
  addMethodStyle,
  expiredText,
  title,
}: PaymentBarProps) => {
  const { colors } = useTheme();

  const selectedBarMode = selected ? BarModes.Active : BarModes.Disabled;

  const computedStyles = StyleSheet.create({
    container: squareShape
      ? {
          width: 150,
          height: 100,
          padding: 16,
          justifyContent: 'space-between',
        }
      : {
          height: 72,
          padding: 24,
          flexDirection: 'row',
        },
    checkContainer: {
      marginLeft: squareShape ? 0 : 16,
      flexGrow: squareShape || expiredText ? 0 : 1,
    },
    expiredContainer: {
      backgroundColor: colors.errorColorWithOpacity,
    },
    expiredText: {
      color: colors.errorColor,
    },
    stars: {
      color: colors.textQuadraticColor,
    },
  });

  const titleText = method.details?.length ? (
    <View style={styles.detailsContainer}>
      <Text style={[styles.stars, computedStyles.stars]}>****</Text>
      <Text style={styles.text}>{method.details}</Text>
    </View>
  ) : (
    <Text style={styles.text}>{title}</Text>
  );

  if (addMethodStyle) {
    return (
      <Bar style={[computedStyles.container, style]} onPress={onPress} mode={BarModes.Default}>
        {getPaymentIcon(method.method)}
        <View style={[styles.checkContainer, computedStyles.checkContainer]}>
          {titleText}
          {expiredText ? (
            <View style={[styles.expiredContainer, computedStyles.expiredContainer]}>
              <Text style={[styles.expiredText, computedStyles.expiredText]}>{expiredText}</Text>
            </View>
          ) : (
            <PlusInCircleIcon
              color={colors.iconPrimaryColor}
              background={colors.backgroundSecondaryColor}
              style={styles.checkIcon}
            />
          )}
        </View>
      </Bar>
    );
  }

  return (
    <Bar style={[computedStyles.container, style]} onPress={onPress} mode={selectedBarMode}>
      {getPaymentIcon(method.method)}
      <View style={[styles.checkContainer, computedStyles.checkContainer]}>
        {titleText}
        {selected && <RoundCheckIcon4 style={styles.checkIcon} />}
      </View>
    </Bar>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 24,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  text: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expiredContainer: {
    height: 24,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginLeft: 6,
  },
  expiredText: {
    fontSize: 12,
    fontFamily: 'Inter Medium',
  },
  stars: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
    marginTop: 3,
  },
  detailsContainer: {
    flexDirection: 'row',
  },
});

export default PaymentBar;
