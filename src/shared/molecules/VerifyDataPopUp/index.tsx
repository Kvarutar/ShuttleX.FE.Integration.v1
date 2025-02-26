import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button/v2';
import BigHeader from '../BigHeader';
import BottomWindowWithGesture from '../BottomWindowWithGesture';
import { type VerifyDataPopUpType } from './types';

const windowSizes = Dimensions.get('window');

const VerifyDataPopUpWithoutI18n = ({
  mode,
  handleOpenVerification,
  data,
  onVerifyPopupClose,
}: VerifyDataPopUpType) => {
  const { t } = useTranslation();

  const firstSubTitleWithMode = {
    email: t('VerifyDataPopUp_firstTitleEmailMode'),
    phone: t('VerifyDataPopUp_firstTitlePhoneMode'),
  };

  const computedStyles = StyleSheet.create({
    wrapper: {
      height: windowSizes.height / 3,
    },
  });

  const onConfirm = () => {
    onVerifyPopupClose();
    handleOpenVerification(mode, data, 'verify');
  };

  const hiddenPart = (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      <BigHeader
        windowTitle={t('VerifyDataPopUp_subTitle')}
        firstHeaderTitle={t('VerifyDataPopUp_firstTitle', { mode: firstSubTitleWithMode[mode] })}
        secondHeaderTitle={data}
      />
      <Button text={t('VerifyDataPopUp_button')} onPress={onConfirm} />
    </View>
  );

  return <BottomWindowWithGesture withShade opened setIsOpened={onVerifyPopupClose} hiddenPart={hiddenPart} />;
};

const VerifyDataPopUp = (props: VerifyDataPopUpType) => (
  <I18nextProvider i18n={i18nIntegration}>
    <VerifyDataPopUpWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
  },
  popup: {
    gap: 14,
  },
});
export default VerifyDataPopUp;
