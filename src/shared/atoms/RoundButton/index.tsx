import { Pressable, StyleSheet, View } from 'react-native';
import { Shadow, type ShadowProps } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import { RoundButtonMode, type RoundButtonProps } from './types';

type RoundButtonStyleProperties = {
  shadowProps: ShadowProps;
  backgroundColor: string;
};

type RoundButtonProperties = Record<RoundButtonMode, RoundButtonStyleProperties>;

const RoundButton = ({
  onPress,
  style,
  children,
  roundButtonStyle,
  mode = RoundButtonMode.Active,
}: RoundButtonProps): JSX.Element => {
  const { colors, themeMode } = useTheme();

  const roundButtonProperties: RoundButtonProperties = {
    active: {
      shadowProps: defaultShadow(colors.strongShadowColor),
      backgroundColor: themeMode === 'light' ? colors.backgroundPrimaryColor : colors.backgroundSecondaryColor,
    },
    disabled: {
      shadowProps: { disabled: true },
      backgroundColor: colors.borderColor,
    },
  };

  const { shadowProps, backgroundColor } = roundButtonProperties[mode];

  const computedStyles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
    },
  });

  return (
    <View style={style}>
      <Shadow stretch {...shadowProps}>
        <Pressable style={[computedStyles.container, styles.container, roundButtonStyle]} onPress={onPress}>
          {children}
        </Pressable>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundButton;
