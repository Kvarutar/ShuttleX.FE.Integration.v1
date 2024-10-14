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
            // Если удаляют символы
            if (text.length < prevQuantity.length) {
              // Если все стерли, обнуляем значение
              if (text.length === 0) {
                onChangeText?.('');
                return '';
              }
              // Обновляем текст без форматирования
              onChangeText?.(text);
              return text;
            }

            // Получаем последний введенный символ
            const lastSymbol = text[text.length - 1];

            // Проверяем, не пытается ли пользователь ввести вторую точку
            if (lastSymbol === '.' && prevQuantity.includes('.')) {
              onChangeText?.(prevQuantity);
              return prevQuantity;
            }

            // Разрешаем ввод до двух знаков после точки
            const decimalIndex = text.indexOf('.');
            if (decimalIndex !== -1) {
              const decimals = text.substring(decimalIndex + 1);
              // Если введено больше двух знаков после точки
              if (decimals.length > 2) {
                onChangeText?.(prevQuantity);
                return prevQuantity;
              }
            }

            // Обновляем значение поля
            onChangeText?.(text);
            return text;
          });
        }
      },
      [currencySymbol, formatNumber, onChangeText],
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
