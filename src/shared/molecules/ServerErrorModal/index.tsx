import { I18nextProvider, useTranslation } from 'react-i18next';
import { Modal, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button/v2';
import BigHeader from '../BigHeader';
import BottomWindowWithGesture from '../BottomWindowWithGesture';
import { type ServerErrorModalProps } from './types';

const ServerErrorModalWithoutI18n = ({ setIsVisible }: ServerErrorModalProps) => {
  const { t } = useTranslation();

  const hiddenPartContent = (
    <View>
      <BigHeader
        firstHeaderTitle={t('ServerErrorModal_firstText')}
        secondHeaderTitle={t('ServerErrorModal_secondText')}
        description={t('ServerErrorModal_description')}
      />
      <Button
        containerStyle={styles.button}
        text={t('ServerErrorModal_buttonTitle')}
        onPress={() => setIsVisible(false)}
      />
    </View>
  );

  return (
    <Modal transparent>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <BottomWindowWithGesture hiddenPart={hiddenPartContent} setIsOpened={setIsVisible} withShade opened />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Modal>
  );
};

const ServerErrorModal = (props: ServerErrorModalProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <ServerErrorModalWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginTop: 180,
  },
});

export default ServerErrorModal;
