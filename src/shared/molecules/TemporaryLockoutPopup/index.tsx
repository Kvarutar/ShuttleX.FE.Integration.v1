import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button/v2';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../atoms/Button/v2/props';
import BigHeader from '../BigHeader';
import BottomWindow from '../BottomWindow';
import { type TemporaryLockoutPopupProps } from './types';

const TemporaryLockoutPopupWithoutI18n = ({
  lockOutTimeText,
  lockOutTime,
  onSupportButtonPress,
  onBannedAgainButtonPress,
}: TemporaryLockoutPopupProps) => {
  const { t } = useTranslation();

  const computedStyles = StyleSheet.create({
    supportButton: {
      marginTop: onBannedAgainButtonPress && lockOutTime ? 40 : 110,
    },
  });

  return (
    <BottomWindow withShade>
      <BigHeader
        windowTitle={t('TemporaryLockoutPopup_title')}
        firstHeaderTitle={t('TemporaryLockoutPopup_firstText', { time: lockOutTimeText })}
        description={t('TemporaryLockoutPopup_description')}
      />
      {onBannedAgainButtonPress && lockOutTime && (
        <Button
          style={styles.bannedAgainButton}
          circleMode6Time={lockOutTime}
          shape={ButtonShapes.Circle}
          mode={CircleButtonModes.Mode6}
          size={ButtonSizes.L}
          onPress={onBannedAgainButtonPress}
          text={t('TemporaryLockoutPopup_againButton')}
        />
      )}
      <Button
        style={computedStyles.supportButton}
        textStyle={styles.supportButtonText}
        onPress={onSupportButtonPress}
        text={t('TemporaryLockoutPopup_supportButton')}
      />
    </BottomWindow>
  );
};

const TemporaryLockoutPopup = (props: TemporaryLockoutPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <TemporaryLockoutPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  bannedAgainButton: {
    alignSelf: 'center',
    marginTop: 40,
  },
  supportButtonText: {
    fontSize: 17,
  },
});

export default TemporaryLockoutPopup;
