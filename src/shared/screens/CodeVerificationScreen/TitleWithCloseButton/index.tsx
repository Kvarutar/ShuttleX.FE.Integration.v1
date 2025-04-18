import { I18nextProvider } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import { useTheme } from '../../../../core/themes/themeContext';
import Button from '../../../atoms/Button';
import { ButtonShapes, ButtonSizes, CircleButtonModes } from '../../../atoms/Button/types';
import Text from '../../../atoms/Text';
import InputXIcon from '../../../icons/InputXIcon';
import { type TitleWithCloseButtonProps } from './types';

const TitleWithCloseButtonWithoutI118n = ({ title, onBackButtonPress }: TitleWithCloseButtonProps): JSX.Element => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    title: {
      color: colors.textTitleColor,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, computedStyles.title]}>{title}</Text>
      <Button
        shape={ButtonShapes.Circle}
        mode={CircleButtonModes.Mode2}
        size={ButtonSizes.S}
        onPress={onBackButtonPress}
      >
        <InputXIcon color={colors.textPrimaryColor} />
      </Button>
    </View>
  );
};

const TitleWithCloseButton = (props: TitleWithCloseButtonProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <TitleWithCloseButtonWithoutI118n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter Bold',
    fontSize: 14,
    lineHeight: 14,
  },
});

export default TitleWithCloseButton;
