import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../../../core/themes/themeContext';
import Text from '../../../../atoms/Text';
import ShortArrowIcon from '../../../../icons/ShortArrowIcon';
import { type ListItemProps } from '../props';

const ListItem = ({
  iconSvg,
  icc,
  countryName,
  style,
  withArrow,
  onFlagContainerPress,
}: ListItemProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    labelPhone: {
      color: colors.textSecondaryColor,
    },
  });

  return (
    <Pressable style={[styles.container, style]} onPress={onFlagContainerPress}>
      <View style={[styles.flagContainer]}>
        {iconSvg}
        {withArrow && <ShortArrowIcon style={styles.shortArrowIcon} />}
      </View>
      <Text style={styles.codePhone}>{`+${icc}`}</Text>
      <Text style={[styles.labelPhone, computedStyles.labelPhone]}>{countryName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  flagContainer: {
    width: 89,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  codePhone: {
    width: 70,
    lineHeight: 19,
    fontFamily: 'Inter Medium',
  },
  labelPhone: {
    flex: 1,
    lineHeight: 19,
    fontFamily: 'Inter Medium',
  },
  shortArrowIcon: {
    transform: [{ rotate: '90deg' }, { translateX: 1 }],
  },
});

export default ListItem;
