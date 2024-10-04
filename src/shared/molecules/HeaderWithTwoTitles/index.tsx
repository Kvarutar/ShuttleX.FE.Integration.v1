import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/v2/themeContext';
import Text from '../../atoms/Text';
import { type HeaderWithTwoTitlesProps } from './props';

const HeaderWithTwoTitles = ({
  firstTitle,
  secondTitle,
  firstTextStyle,
  secondTextStyle,
}: HeaderWithTwoTitlesProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    headerFirstTitle: {
      color: colors.textPrimaryColor,
    },
    headerSecondTitle: {
      color: colors.textQuadraticColor,
    },
  });

  return (
    <View>
      <Text style={[styles.headerTextLabels, computedStyles.headerFirstTitle, firstTextStyle]}>{firstTitle}</Text>
      <Text style={[styles.headerTextLabels, computedStyles.headerSecondTitle, secondTextStyle]}>{secondTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextLabels: {
    fontFamily: 'Inter Bold',
    fontSize: 34,
    lineHeight: 34,
    letterSpacing: -1.53,
  },
});

export default HeaderWithTwoTitles;
