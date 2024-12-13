import { I18nextProvider, useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button/v2';
import { SquareButtonModes } from '../../atoms/Button/v2/props';
import BigHeader from '../BigHeader';
import BottomWindowWithGesture from '../BottomWindowWithGesture';
import { type UnsupportedCityPopupProps } from './types';

const UnsupportedCityPopupWithoutI18n = ({
  setIsUnsupportedCityPopupVisible,
  onSupportPressHandler,
}: UnsupportedCityPopupProps) => {
  const { t } = useTranslation();

  const onPressSupport = () => {
    onSupportPressHandler();
    setIsUnsupportedCityPopupVisible(false);
  };

  const onPressClose = () => {
    setIsUnsupportedCityPopupVisible(false);
  };

  const hiddenPartContent = (
    <View>
      <BigHeader
        windowTitle={t('UnsupportedCityPopup_subTitle')}
        firstHeaderTitle={t('UnsupportedCityPopup_firstTitle')}
        secondHeaderTitle={t('UnsupportedCityPopup_secondTitle')}
        description={t('UnsupportedCityPopup_description')}
      />
      <View style={styles.buttonsContainer}>
        <Button
          containerStyle={styles.button}
          text={t('UnsupportedCityPopup_supportButton')}
          onPress={onPressSupport}
        />
        <Button
          containerStyle={styles.button}
          text={t('UnsupportedCityPopup_closeButton')}
          mode={SquareButtonModes.Mode5}
          onPress={onPressClose}
        />
      </View>
    </View>
  );

  return (
    <BottomWindowWithGesture
      hiddenPart={hiddenPartContent}
      setIsOpened={setIsUnsupportedCityPopupVisible}
      withShade
      opened
    />
  );
};

const UnsupportedCityPopup = (props: UnsupportedCityPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <UnsupportedCityPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 110,
  },
  button: {
    flex: 1,
  },
});

export default UnsupportedCityPopup;
