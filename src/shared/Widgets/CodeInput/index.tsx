import React, { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import TextInput from '../../BrandBook/TextInput';
import { TextInputInputMode, type TextInputRef } from '../../BrandBook/TextInput/props';
import { type CodeInputProps, type CodeNumberProps } from './props';

const CodeNumber = forwardRef<TextInputRef, CodeNumberProps>(({ input, setInput, onKeyPress }, ref) => (
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
    style={styles.codeInput}
    maxLength={1}
  />
));

const CodeInput = ({ style, onCodeChange }: CodeInputProps): JSX.Element => {
  //TODO: Refactor code by using dictionary
  const isFirstRender = useRef(true);
  const firstCodeNumberRef = useRef<TextInputRef>(null);
  const secondCodeNumberRef = useRef<TextInputRef>(null);
  const thirdCodeNumberRef = useRef<TextInputRef>(null);
  const fourthCodeNumberRef = useRef<TextInputRef>(null);

  const [firstCodeNumberInput, setFirstCodeNumberInput] = useState('');
  const [secondCodeNumberInput, setSecondCodeNumberInput] = useState('');
  const [thirdCodeNumberInput, setThirdCodeNumberInput] = useState('');
  const [fourthCodeNumberInput, setFourthCodeNumberInput] = useState('');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      firstCodeNumberRef.current?.focus();
    }
  }, []);

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
      <CodeNumber ref={firstCodeNumberRef} input={firstCodeNumberInput} setInput={setFirstCodeNumberInput} />
      <CodeNumber
        ref={secondCodeNumberRef}
        input={secondCodeNumberInput}
        setInput={setSecondCodeNumberInput}
        onKeyPress={e => {
          if (e.nativeEvent.key === 'Backspace') {
            firstCodeNumberRef.current?.focus();
          }
        }}
      />
      <CodeNumber
        ref={thirdCodeNumberRef}
        input={thirdCodeNumberInput}
        setInput={setThirdCodeNumberInput}
        onKeyPress={e => {
          if (e.nativeEvent.key === 'Backspace') {
            secondCodeNumberRef.current?.focus();
          }
        }}
      />
      <CodeNumber
        ref={fourthCodeNumberRef}
        input={fourthCodeNumberInput}
        setInput={setFourthCodeNumberInput}
        onKeyPress={e => {
          if (e.nativeEvent.key === 'Backspace') {
            thirdCodeNumberRef.current?.focus();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  codeInput: {
    textAlign: 'center',
    height: 72,
    width: 64,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 48,
  },
});

export default CodeInput;
