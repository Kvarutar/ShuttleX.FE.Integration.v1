import { StyleSheet, View } from 'react-native';

import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import MenuIcon from '../../icons/MenuIcon';
import { type MenuHeaderTypes } from './types';

const MenuHeader = ({
  onMenuPress,
  children,
  style,
  rightButton,
  leftButtonProps = {
    mode: CircleButtonModes.Mode2,
    size: ButtonSizes.S,
  },
  leftButtonIcon,
}: MenuHeaderTypes) => {
  const computedStyles = StyleSheet.create({
    rightButton: {
      width: rightButton ? undefined : 44,
    },
  });
  return (
    <View style={[styles.header, style]}>
      <Button {...leftButtonProps} shape={ButtonShapes.Circle} onPress={onMenuPress}>
        {leftButtonIcon ?? <MenuIcon />}
      </Button>
      {children}
      <View style={computedStyles.rightButton}>{rightButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default MenuHeader;
