import { I18nextProvider, useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import Button from '../../atoms/Button';
import { CircleButtonModes } from '../../atoms/Button/types';
import GroupedBrandIconMini from '../../icons/GroupedBrandIconMini/V2';
import BigHeader from '../BigHeader';
import SafeAreaView from '../SafeAreaView';
import { type AppBlockPageProps } from './types';

const AppBlockPageWithoutI18n = ({ iconMode, onSignOut }: AppBlockPageProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView containerStyle={styles.container}>
      <View>
        <GroupedBrandIconMini style={styles.icon} isContractorIcon={iconMode === 'contractor'} />
        <BigHeader
          firstHeaderTitle={t('AppBlockPage_firstTitle')}
          secondHeaderTitle={t('AppBlockPage_secondTitle')}
          description={t('AppBlockPage_description')}
          headerInOneLine
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.button}
          text={t('AppBlockPage_shuttleXButton')}
          onPress={() => Linking.openURL('https://www.shuttlex.com')}
        />
        <Button
          containerStyle={styles.button}
          mode={CircleButtonModes.Mode5}
          text={t('AppBlockPage_thanksButton')}
          onPress={onSignOut}
        />
      </View>
    </SafeAreaView>
  );
};

const AppBlockPage = (props: AppBlockPageProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <AppBlockPageWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  icon: {
    marginBottom: 26,
  },
  buttonContainer: {
    gap: 8,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});

export default AppBlockPage;
