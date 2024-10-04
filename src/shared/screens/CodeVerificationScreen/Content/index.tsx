import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import Button from '../../../atoms/Button/v2';
import {
  type ButtonRef,
  ButtonShadows,
  ButtonShapes,
  ButtonSizes,
  CircleButtonModes,
} from '../../../atoms/Button/v2/props';
import CodeInput from '../../../molecules/CodeInput/v2';
import HeaderWithTwoTitles from '../../../molecules/HeaderWithTwoTitles';
import { type ContentProps } from './types';

const Content = ({
  time,
  headerFirstText,
  headerSecondText,
  onCodeChange,
  onButtonPress,
  isError,
}: ContentProps): JSX.Element => {
  const { t } = useTranslation();
  const buttonRef = useRef<ButtonRef>(null);

  const handlePress = () => {
    buttonRef.current?.restartMode6Animation();
    onButtonPress();
  };

  return (
    <>
      <HeaderWithTwoTitles firstTitle={headerFirstText} secondTitle={headerSecondText} />
      <CodeInput style={styles.codeInput} onCodeChange={onCodeChange} isError={isError} />
      <Button
        ref={buttonRef}
        style={styles.againButton}
        shape={ButtonShapes.Circle}
        circleMode6Time={time}
        mode={CircleButtonModes.Mode6}
        size={ButtonSizes.L}
        shadow={ButtonShadows.Weak}
        onPress={handlePress}
        text={t('CodeVerification_againButton')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  codeInput: {
    flex: 1,
    gap: 30,
    marginTop: 40,
    alignSelf: 'center',
  },
  againButton: {
    alignSelf: 'center',
  },
});

export default Content;
