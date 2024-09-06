import { StyleSheet, TextInput as TextInputNative, View } from 'react-native';

import { useTheme } from '../../../core/themes/v2/themeContext';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import ArrowSendMessageIcon from '../../icons/ArrowSendMessageIcon';
import AttachImageIcon from '../../icons/AttachImageIcon';
import { type ChatInputProps } from './props';

const ChatInput = ({
  containerStyle,
  icon,
  button = {
    size: ButtonSizes.M,
    shape: ButtonShapes.Circle,
    mode: CircleButtonModes.Mode1,
  },
  placeholder,
  onChangeText,
  value,
  style,
  onKeyPress,
  onEndEditing,
  disabledButton,
}: ChatInputProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.containerStyles, containerStyle]}>
      <AttachImageIcon style={icon?.attachImageStyle} color={icon?.attachImageColor} />
      <TextInputNative
        style={[styles.input, style]}
        placeholderTextColor={colors.textSecondaryColor}
        cursorColor={colors.textPrimaryColor}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        value={value}
        pointerEvents="box-none"
        onEndEditing={onEndEditing}
      />
      <Button
        shape={button.shape}
        containerStyle={[styles.buttonContainer, button.containerStyle]}
        mode={button.mode}
        disabled={disabledButton}
        size={button.size}
      >
        <ArrowSendMessageIcon style={icon?.buttonStyle} color={icon?.buttonColor} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    borderRadius: 32,
    height: 62,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  buttonContainer: {
    height: 42,
  },
});

export default ChatInput;
