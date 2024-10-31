import { forwardRef, useCallback, useEffect, useState } from 'react';

import { TextInputInputMode, type TextInputProps, type TextInputRef } from './props';
import TextInputBase from './TextInputBase';

const parseNumber = (str: string): number => Number(str.replace(/[^0-9.]+/g, ''));

const MoneyInput = forwardRef<TextInputRef, TextInputProps>(
  (
    {
      inputStyle,
      containerStyle,
      wrapperStyle,
      placeholder,
      onChangeText,
      value = '',
      currencySymbol = '',
      maxSymbolsAfterComma = 2,
      onEndEditing,
      onFocus,
      onBlur,
      onKeyPress,
      maxLength,
      editable,
      error = { isError: false },
      multiline,
    },
    ref,
  ) => {
    const formatNumber = useCallback(
      (valueForFormatting: string | number) => {
        if (!valueForFormatting.toString().includes(currencySymbol)) {
          return currencySymbol + valueForFormatting.toString().replace(',', '.');
        }
        return valueForFormatting.toString().replace(',', '.');
      },
      [currencySymbol],
    );

    const [quantity, setQuantity] = useState(value ?? '');

    const onChangeValue = useCallback(
      (text: string) => {
        text = formatNumber(text);

        if (text.includes(currencySymbol) && text.length > 0) {
          setQuantity(prevQuantity => {
            // If symbols are removed
            if (text.length < prevQuantity.length) {
              // If all symbols is removed, reset the value
              if (text.length === 0) {
                onChangeText?.('');
                return '';
              }
              // Updating text without formatting
              onChangeText?.(text);
              return text;
            }

            // Getting the last symbol entered
            const lastSymbol = text[text.length - 1];

            // Checking if the user is trying to enter a second dot
            if (lastSymbol === '.' && prevQuantity.includes('.')) {
              onChangeText?.(prevQuantity);
              return prevQuantity;
            }

            // Allow input up to maxSymbolsAfterComma symbols after the dot
            const decimalIndex = text.indexOf('.');
            if (decimalIndex !== -1) {
              const decimals = text.substring(decimalIndex + 1);
              // If more than maxSymbolsAfterComma symbols are entered after the dot, then we return the previous value
              if (decimals.length > maxSymbolsAfterComma) {
                onChangeText?.(prevQuantity);
                return prevQuantity;
              }
            }

            // Update the field value
            onChangeText?.(text);
            return text;
          });
        }
      },
      [currencySymbol, formatNumber, onChangeText, maxSymbolsAfterComma],
    );

    useEffect(() => {
      onChangeValue(value);
    }, [value, onChangeValue]);

    const props = {
      onEndEditing,
      onFocus,
      onBlur,
      onKeyPress,
      maxLength,
      editable,
      error,
      inputStyle,
      containerStyle,
      wrapperStyle,
      multiline,
      ref,
    };

    return (
      <TextInputBase
        inputMode={TextInputInputMode.Decimal}
        placeholder={formatNumber(placeholder ? parseNumber(placeholder) : 0)}
        value={quantity}
        onChangeText={onChangeValue}
        {...props}
      />
    );
  },
);

export default MoneyInput;
