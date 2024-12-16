import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, HeaderWithTwoTitles, Text, useTheme } from 'shuttlex-integration';

import { type VerifyDataPopUpType } from './types';

const windowSizes = Dimensions.get('window');

const VerifyDataPopUp = ({ mode, handleOpenVerification, data, onVerifyPopupClose }: VerifyDataPopUpType) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    wrapper: {
      height: windowSizes.height / 3,
    },
    changeText: {
      color: colors.textTitleColor,
    },
  });

  const onConfirm = () => {
    onVerifyPopupClose();
    handleOpenVerification(mode, data, 'verify');
  };

  return (
    <View style={[styles.wrapper, computedStyles.wrapper]}>
      <View style={styles.popup}>
        <Text style={[styles.changeText, computedStyles.changeText]}>{t('Account_VerifyDataPopUp_confirm')}</Text>
        <HeaderWithTwoTitles firstTitle={t('Account_VerifyDataPopUp_firstTitle', { mode })} secondTitle={data} />
      </View>
      <Button text={t('Account_VerifyDataPopUp_confirm')} onPress={onConfirm} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'space-between',
  },
  changeText: {
    fontSize: 14,
    fontFamily: 'Inter Bold',
  },
  popup: {
    gap: 14,
  },
});
export default VerifyDataPopUp;
