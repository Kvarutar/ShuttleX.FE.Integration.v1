import { forwardRef, useState } from 'react';

import { TextInputInputMode, type TextInputProps, type TextInputRef } from './props';
import TextInputBase from './TextInputBase';

const parseNumber = (str: string): number => Number(str.replace(/[^0-9.]+/g, ''));
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const MoneyInput = forwardRef<TextInputRef, TextInputProps>(
  (
    {
      style,
      placeholder,
      onChangeText,
      value = '',
      onEndEditing,
      onFocus,
      onBlur,
      onKeyPress,
      maxLength,
      editable,
      containerStyle,
      error = { isError: false },
      multiline,
    },
    ref,
  ) => {
    const [quantity, setQuantity] = useState(value ? USDollar.format(+value) : '');

    const onChangeValue = (text: string) => {
      setQuantity(prevQuantity => {
        // Если текст стирают
        if (text.length < prevQuantity.length) {
          if (text.length === 1) {
            return '';
          }
          onChangeText?.(USDollar.format(parseNumber(text)));
          return USDollar.format(parseNumber(text));
        }

        const lastSymbol = text[text.length - 1];
        // Если пользователь пытается поставить вторую точку
        if (lastSymbol === '.' && prevQuantity.includes('.')) {
          onChangeText?.(prevQuantity);
          return prevQuantity;
        }
        // Если пользователь пытается поставить точку или ноль в конце
        if (lastSymbol === '.' || (lastSymbol === '0' && text.includes('.'))) {
          onChangeText?.(text);
          return text;
        }

        //если пользователь пытается ввести больше 2-х знаков после запятой
        const decimalStartAt = text.indexOf('.');

        if (decimalStartAt !== -1) {
          const decimals = text.split('.');
          if (decimals[1] && decimals[1].length > 2) {
            onChangeText?.(prevQuantity);
            return prevQuantity;
          }
        }

        onChangeText?.(USDollar.format(parseNumber(text)));
        return USDollar.format(parseNumber(text));
      });
    };

    const props = {
      onEndEditing,
      onFocus,
      onBlur,
      onKeyPress,
      maxLength,
      editable,
      error,
      style,
      containerStyle,
      multiline,
      ref,
    };

    return (
      <TextInputBase
        inputMode={TextInputInputMode.Numeric}
        placeholder={USDollar.format(placeholder ? parseNumber(placeholder) : 0)}
        value={quantity}
        onChangeText={onChangeValue}
        {...props}
      />
    );
  },
);

export default MoneyInput;
