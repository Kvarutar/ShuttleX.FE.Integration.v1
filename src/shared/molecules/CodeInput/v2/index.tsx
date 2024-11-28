import { useNavigation } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, type TextInputProps, View } from 'react-native';

import { useTheme } from '../../../../core/themes/v2/themeContext';
import TextInput from '../../../atoms/TextInput/v2';
import { TextInputInputMode, type TextInputRef } from '../../../atoms/TextInput/v2/props';
import { type CodeInputProps, type CodeInputRef, type CodeNumberProps } from '../props';

const CodeNumber = forwardRef<TextInputRef, CodeNumberProps>(
  ({ input, setInput, onBackspaceKeyPress, isError = false }, ref) => {
    const { colors } = useTheme();
    const [lastKeyEventTimestamp, setLastKeyEventTimestamp] = useState(0);

    const onKeyPress: TextInputProps['onKeyPress'] = e => {
      if (onBackspaceKeyPress) {
        // fix for issue https://github.com/facebook/react-native/issues/37967
        // older version same issue https://github.com/facebook/react-native/issues/18374
        if (e.nativeEvent.key === 'Backspace') {
          if (Math.abs(lastKeyEventTimestamp - e.timeStamp) < 20) {
            return;
          }
          onBackspaceKeyPress();
        } else {
          setLastKeyEventTimestamp(e.timeStamp);
        }
      }
    };

    const computedStyles = StyleSheet.create({
      codeInputContainer: {
        backgroundColor: input ? colors.borderColor : colors.backgroundPrimaryColor,
      },
    });

    return (
      <TextInput
        ref={ref}
        value={input}
        onChangeText={text => {
          if (text === '' || /\d/.test(text)) {
            setInput(text);
          }
        }}
        onKeyPress={onKeyPress}
        inputMode={TextInputInputMode.Numeric}
        containerStyle={[styles.codeInputContainer, computedStyles.codeInputContainer]}
        inputStyle={styles.codeInput}
        error={{ isError: isError }}
        maxLength={1}
      />
    );
  },
);

const CodeInput = forwardRef<CodeInputRef, CodeInputProps>(({ style, onCodeChange, isError }, ref): JSX.Element => {
  //TODO: Refactor code by using dictionary
  const navigation = useNavigation<NativeStackNavigationProp<{}>>();

  const isFirstRender = useRef(true);
  const firstCodeNumberRef = useRef<TextInputRef>(null);
  const secondCodeNumberRef = useRef<TextInputRef>(null);
  const thirdCodeNumberRef = useRef<TextInputRef>(null);
  const fourthCodeNumberRef = useRef<TextInputRef>(null);

  const [firstCodeNumberInput, setFirstCodeNumberInput] = useState('');
  const [secondCodeNumberInput, setSecondCodeNumberInput] = useState('');
  const [thirdCodeNumberInput, setThirdCodeNumberInput] = useState('');
  const [fourthCodeNumberInput, setFourthCodeNumberInput] = useState('');

  useImperativeHandle(ref, () => ({
    cleanFields: () => {
      setFirstCodeNumberInput('');
      setSecondCodeNumberInput('');
      setThirdCodeNumberInput('');
      setFourthCodeNumberInput('');
    },
  }));

  useEffect(() => {
    navigation.addListener('transitionEnd', () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        firstCodeNumberRef.current?.focus();
      }
    });
  }, [navigation]);

  useEffect(() => {
    onCodeChange(firstCodeNumberInput + secondCodeNumberInput + thirdCodeNumberInput + fourthCodeNumberInput);
  }, [firstCodeNumberInput, secondCodeNumberInput, thirdCodeNumberInput, fourthCodeNumberInput, onCodeChange]);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    if (firstCodeNumberInput.length) {
      secondCodeNumberRef.current?.focus();
    } else {
      firstCodeNumberRef.current?.blur();
    }
  }, [firstCodeNumberInput]);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    if (secondCodeNumberInput.length) {
      thirdCodeNumberRef.current?.focus();
    } else {
      firstCodeNumberRef.current?.focus();
    }
  }, [secondCodeNumberInput]);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    if (thirdCodeNumberInput.length) {
      fourthCodeNumberRef.current?.focus();
    } else {
      secondCodeNumberRef.current?.focus();
    }
  }, [thirdCodeNumberInput]);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    if (fourthCodeNumberInput.length) {
      fourthCodeNumberRef.current?.blur();
    } else {
      thirdCodeNumberRef.current?.focus();
    }
  }, [fourthCodeNumberInput]);

  return (
    <View style={[styles.container, style]}>
      <CodeNumber
        ref={firstCodeNumberRef}
        input={firstCodeNumberInput}
        setInput={setFirstCodeNumberInput}
        isError={isError}
      />
      <CodeNumber
        ref={secondCodeNumberRef}
        input={secondCodeNumberInput}
        setInput={setSecondCodeNumberInput}
        onBackspaceKeyPress={() => firstCodeNumberRef.current?.focus()}
        isError={isError}
      />
      <CodeNumber
        ref={thirdCodeNumberRef}
        input={thirdCodeNumberInput}
        setInput={setThirdCodeNumberInput}
        onBackspaceKeyPress={() => secondCodeNumberRef.current?.focus()}
        isError={isError}
      />
      <CodeNumber
        ref={fourthCodeNumberRef}
        input={fourthCodeNumberInput}
        setInput={setFourthCodeNumberInput}
        onBackspaceKeyPress={() => thirdCodeNumberRef.current?.focus()}
        isError={isError}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 40,
  },
  codeInputContainer: {
    height: 72,
    width: 64,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  codeInput: {
    height: '100%',
    fontFamily: 'Inter Bold',
    fontSize: 34,
    textAlign: 'center',
  },
});

export default CodeInput;
