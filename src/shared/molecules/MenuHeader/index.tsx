import { StyleSheet, View } from 'react-native';

import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import MenuIcon from '../../icons/MenuIcon';
import NotificationIcon from '../../icons/NotificationIcon';
import { type MenuHeaderTypes } from './props';

const MenuHeader = ({
  onMenuPress,
  onNotificationPress,
  children,
  leftButtonProps = {
    mode: CircleButtonModes.Mode2,
    size: ButtonSizes.S,
  },
}: MenuHeaderTypes) => {
  return (
    <View style={styles.header}>
      <Button {...leftButtonProps} shape={ButtonShapes.Circle} onPress={onMenuPress}>
        <MenuIcon />
      </Button>
      {children}
      <Button
        mode={CircleButtonModes.Mode2}
        containerStyle={styles.notifButtonStyle}
        shape={ButtonShapes.Circle}
        onPress={onNotificationPress}
      >
        <NotificationIcon />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  notifButtonStyle: {
    opacity: 0,
    //TODO delete style when we'll have notifications
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default MenuHeader;
