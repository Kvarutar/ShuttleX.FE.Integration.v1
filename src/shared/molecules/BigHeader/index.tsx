import { StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import Text from '../../atoms/Text';
import HeaderWithTwoTitles from '../HeaderWithTwoTitles';
import { type BigHeaderProps } from './types';

const BigHeader = ({
  windowTitle,
  firstHeaderTitle,
  secondHeaderTitle,
  description,
  containerStyle,
  headerInOneLine = false,
}: BigHeaderProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    windowTitle: {
      color: colors.textTitleColor,
    },
    description: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <View style={containerStyle}>
      {windowTitle && <Text style={[styles.windowTitle, computedStyles.windowTitle]}>{windowTitle}</Text>}
      <HeaderWithTwoTitles firstTitle={firstHeaderTitle} secondTitle={secondHeaderTitle} inOneLine={headerInOneLine} />
      {description && <Text style={[styles.description, computedStyles.description]}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  windowTitle: {
    fontFamily: 'Inter Bold',
    fontSize: 14,
    marginBottom: 14,
  },
  description: {
    fontFamily: 'Inter Medium',
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default BigHeader;
