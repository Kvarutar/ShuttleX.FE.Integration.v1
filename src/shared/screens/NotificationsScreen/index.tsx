import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet } from 'react-native';

import i18nIntegration from '../../../core/locales/i18n';
import sizes from '../../../core/themes/sizes';
import GroupedButtons from '../../molecules/GroupedButtons';
import ScrollViewWithCustomScroll from '../../molecules/ScrollViewWithCustomScroll';
import NotificationScreenItem from './NotificationScreenItem';
import { type NotificationsScreenProps } from './props';

const windowWidth = Dimensions.get('window').width;

const NotificationsScreenWithoutI18n = ({ notifications }: NotificationsScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);

  const content = notifications.map((notification, index) => (
    <NotificationScreenItem key={index} notification={notification} />
  ));

  return (
    <>
      <GroupedButtons
        style={styles.groupedButtons}
        width={windowWidth - sizes.paddingHorizontal * 2}
        firstButtonText={t('Notifications_GroupedButton_firstButton')}
        secondButtonText={t('Notifications_GroupedButton_secondButton')}
        isFirstButtonSelected={isFirstButtonSelected}
        setIsFirstButtonSelected={setIsFirstButtonSelected}
      />
      <ScrollViewWithCustomScroll withShadow contentContainerStyle={styles.contentContainer}>
        {content}
      </ScrollViewWithCustomScroll>
    </>
  );
};

const NotificationsScreen = (props: NotificationsScreenProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <NotificationsScreenWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  groupedButtons: {
    marginBottom: 20,
  },
  contentContainer: {
    gap: 16,
  },
});

export default NotificationsScreen;
