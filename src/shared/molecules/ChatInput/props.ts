import { type StyleProp, type TextInputProps as TextInputPropsNative, type ViewStyle } from 'react-native';

import { ButtonShapes, ButtonSizes, type CircleButtonModes, SquareButtonModes } from '../../atoms/Button/v2/props';

export type ChatInputProps = {
  style?: TextInputPropsNative['style'];
  icon?: {
    buttonStyle?: StyleProp<ViewStyle>;
    attachImageStyle?: StyleProp<ViewStyle>;
    buttonColor?: string;
    attachImageColor?: string;
  };
  button?: {
    containerStyle?: StyleProp<ViewStyle>;
    mode?: CircleButtonModes | SquareButtonModes;
    shape?: ButtonShapes;
    size?: ButtonSizes;
  };

  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: TextInputPropsNative['placeholder'];
  onChangeText?: TextInputPropsNative['onChangeText'];
  value?: TextInputPropsNative['value'];
  onKeyPress?: TextInputPropsNative['onKeyPress'];
  onEndEditing?: TextInputPropsNative['onEndEditing'];
  multiline?: TextInputPropsNative['multiline'];
  disabledButton?: boolean;
};
