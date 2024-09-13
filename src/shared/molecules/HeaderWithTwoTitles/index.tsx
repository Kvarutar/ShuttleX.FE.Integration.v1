import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/v2/themeContext';
import Text from '../../atoms/Text';
import { type HeaderWithTwoTitlesProps } from './props';

const HeaderWithTwoTitles = ({ firstTitle, secondTitle, textStyle }: HeaderWithTwoTitlesProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    headerFirstTitle: {
      color: colors.textPrimaryColor,
    },
    headerSecondTitle: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <View>
      <Text style={[styles.headerTextLabels, computedStyles.headerFirstTitle, textStyle]}>{firstTitle}</Text>
      <Text style={[styles.headerTextLabels, computedStyles.headerSecondTitle, textStyle]}>{secondTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextLabels: {
    fontFamily: 'Inter Bold',
    fontSize: 34,
    lineHeight: 34,
  },
});

export default HeaderWithTwoTitles;
