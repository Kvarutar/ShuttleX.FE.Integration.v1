import { useEffect } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/v2/themeContext';
import Text from '../../atoms/Text';
import BottomWindow from '../BottomWindow';
import { type UnclosablePopupProps } from './props';

const UnclosablePopup = ({
  subTitle,
  title,
  secondTitle,
  description,
  bottomWindowStyle,
  bottomAdditionalContent,
}: UnclosablePopupProps) => {
  const { colors } = useTheme();

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const computedStyles = StyleSheet.create({
    subTitle: {
      color: colors.textTitleColor,
    },
    titleFirst: {
      color: colors.textPrimaryColor,
      marginBottom: !secondTitle ? 12 : 0,
    },
    titleSecond: {
      color: colors.textQuadraticColor,
      marginBottom: 14,
    },
    description: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <BottomWindow windowStyle={[styles.windowStyle, bottomWindowStyle]} withShade>
      <View>
        {subTitle && <Text style={[styles.subTitle, computedStyles.subTitle]}>{subTitle}</Text>}
        <View>
          {title && <Text style={[styles.titleFirst, computedStyles.titleFirst]}>{title}</Text>}
          {secondTitle && <Text style={[styles.titleSecond, computedStyles.titleSecond]}>{secondTitle}</Text>}
        </View>
        {description && <Text style={[styles.description, computedStyles.description]}>{description}</Text>}
      </View>
      {bottomAdditionalContent}
    </BottomWindow>
  );
};

const styles = StyleSheet.create({
  windowStyle: {
    justifyContent: 'space-between',
    paddingVertical: 0,
    paddingTop: 36,
    paddingBottom: 36,
  },
  subTitle: {
    fontFamily: 'Inter Bold',
    fontSize: 14,
    marginBottom: 14,
  },
  titleFirst: {
    fontFamily: 'Inter Bold',
    fontSize: 34,
    letterSpacing: -1.53,
    lineHeight: 34,
  },
  titleSecond: {
    fontFamily: 'Inter Bold',
    fontSize: 34,
    letterSpacing: -1.53,
    marginBottom: 9,
    lineHeight: 34,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default UnclosablePopup;
