import { type ReactNode } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';

import { useTheme } from '../../core/themes/themeContext';
import BasicXImage from './BasicXImage';
import BasicXLImage from './BasicXLImage';
import ComfortXImage from './ComfortXImage';
import PremiumXImage from './PremiumXImage';
import PremiumXLImage from './PremiumXLImage';
import TeslaXImage from './TeslaXImage';

export type TariffType = 'BasicX' | 'BasicXL' | 'ComfortX' | 'PremiumX' | 'PremiumXL' | 'TeslaX';

const images: Record<TariffType, ReactNode> = {
  BasicX: <BasicXImage />,
  BasicXL: <BasicXLImage />,
  ComfortX: <ComfortXImage />,
  PremiumX: <PremiumXImage />,
  PremiumXL: <PremiumXLImage />,
  TeslaX: <TeslaXImage />,
};

const TariffsCarImage = ({ tariff, style }: { tariff: TariffType; style?: StyleProp<ViewStyle> }) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    circle: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
  });

  return (
    <View style={[styles.imgWrapper, style]}>
      <View style={[styles.circle, computedStyles.circle]} />
      <View style={styles.img}>{images[tariff]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  imgWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    marginLeft: -54,
  },
});

export default TariffsCarImage;
