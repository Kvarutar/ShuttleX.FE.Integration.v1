import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../../core/themes/v2/themeContext';
import { type Nullable } from '../../../../utils/typescript';
import Button from '../../../atoms/Button/v2';
import {
  type ButtonRef,
  ButtonShadows,
  ButtonShapes,
  ButtonSizes,
  CircleButtonModes,
} from '../../../atoms/Button/v2/props';
import Text from '../../../atoms/Text';
import CodeInput from '../../../molecules/CodeInput';
import { type CodeInputRef } from '../../../molecules/CodeInput/types';
import HeaderWithTwoTitles from '../../../molecules/HeaderWithTwoTitles';
import ScrollViewWithCustomScroll from '../../../molecules/ScrollViewWithCustomScroll';
import { type ContentProps, type ContentRef } from './types';

const Content = forwardRef<ContentRef, ContentProps>(
  (
    {
      time,
      headerFirstText,
      headerSecondText,
      onCodeChange,
      onButtonPress,
      isError,
      underButtonText,
      underButtonPressableText,
      onPressUnderButtonText,
    },
    ref,
  ): JSX.Element => {
    const { t } = useTranslation();
    const buttonRef = useRef<ButtonRef>(null);
    const codeInputRef = useRef<Nullable<CodeInputRef>>(null);
    const { colors } = useTheme();

    const computedStyles = StyleSheet.create({
      underButtonPressableText: {
        color: colors.textLinkColor,
      },
    });

    useImperativeHandle(ref, () => ({
      refresh: () => {
        codeInputRef?.current?.cleanFields();
        buttonRef.current?.restartMode6Animation();
      },
    }));

    const handlePress = () => {
      buttonRef.current?.restartMode6Animation();
      onButtonPress();
    };

    return (
      <>
        <ScrollViewWithCustomScroll contentContainerStyle={[styles.inputWrapper]}>
          <HeaderWithTwoTitles firstTitle={headerFirstText} secondTitle={headerSecondText} />
          <CodeInput ref={codeInputRef} onCodeChange={onCodeChange} isError={isError} />
        </ScrollViewWithCustomScroll>
        <Button
          ref={buttonRef}
          containerStyle={styles.againButton}
          shape={ButtonShapes.Circle}
          circleMode6Time={time}
          mode={CircleButtonModes.Mode6}
          size={ButtonSizes.L}
          shadow={ButtonShadows.Weak}
          onPress={handlePress}
          text={t('CodeVerification_Content_againButton')}
        />
        {(underButtonText || underButtonPressableText) && (
          <View style={styles.underButtonTextContainer}>
            <Text style={styles.underButtonText}>{underButtonText} </Text>
            <Pressable onPress={onPressUnderButtonText} hitSlop={20}>
              <Text style={[styles.underButtonPressableText, computedStyles.underButtonPressableText]}>
                {underButtonPressableText}
              </Text>
            </Pressable>
          </View>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  inputWrapper: {
    paddingBottom: 24,
  },
  againButton: {
    alignSelf: 'center',
  },
  underButtonTextContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },
  underButtonText: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
  },
  underButtonPressableText: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
  },
});

export default Content;
