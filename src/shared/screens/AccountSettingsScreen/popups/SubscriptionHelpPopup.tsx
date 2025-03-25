import { I18nextProvider, useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import Button from '../../../atoms/Button';
import { SquareButtonModes } from '../../../atoms/Button/types';
import BigHeader from '../../../molecules/BigHeader';
import BottomWindowWithGesture from '../../../molecules/BottomWindowWithGesture';
import { type SubscriptionHelpPopupProps } from '../types';

const SubscriptionHelpPopupWithoutI18n = ({ setIsVisible }: SubscriptionHelpPopupProps) => {
  const { t } = useTranslation();

  const onSupportPress = () => {
    Linking.openURL('https://t.me/ShuttleX_Support');
    setIsVisible(false);
  };

  const hiddenPartContent = (
    <View>
      <BigHeader
        windowTitle={t('AccountSettings_SubscriptionHelp_subTitle')}
        firstHeaderTitle={t('AccountSettings_SubscriptionHelp_firstTitle')}
        secondHeaderTitle={t('AccountSettings_SubscriptionHelp_secondTitle')}
        description={t('AccountSettings_SubscriptionHelp_description')}
      />
      <Button
        containerStyle={styles.button}
        text={t('AccountSettings_SubscriptionHelp_button')}
        mode={SquareButtonModes.Mode2}
        onPress={onSupportPress}
      />
    </View>
  );

  return <BottomWindowWithGesture withShade opened setIsOpened={setIsVisible} hiddenPart={hiddenPartContent} />;
};

const SubscriptionHelpPopup = (props: SubscriptionHelpPopupProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <SubscriptionHelpPopupWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 48,
  },
});

export default SubscriptionHelpPopup;
