import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import BasicXImage from './BasicXImage';
import BasicXLImage from './BasicXLImage';
import ComfortXImage from './ComfortXImage';
import PremiumXImage from './PremiumXImage';
import PremiumXLImage from './PremiumXLImage';
import TeslaXImage from './TeslaXImage';

type TariffType = 'BasicX' | 'BasicXL' | 'ComfortX' | 'PremiumX' | 'PremiumXL' | 'TeslaX';

const images: Record<TariffType, ReactNode> = {
  BasicX: <BasicXImage />,
  BasicXL: <BasicXLImage />,
  ComfortX: <ComfortXImage />,
  PremiumX: <PremiumXImage />,
  PremiumXL: <PremiumXLImage />,
  TeslaX: <TeslaXImage />,
};

const TariffsCarImage = ({ tariff }: { tariff: TariffType }) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    circle: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
  });

  return (
    <View style={styles.imgWrapper}>
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
