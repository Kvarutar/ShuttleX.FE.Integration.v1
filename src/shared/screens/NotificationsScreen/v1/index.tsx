import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet } from 'react-native';

import i18nIntegration from '../../../../core/locales/i18n';
import sizes from '../../../../core/themes/sizes';
import GroupedButtonsV1 from '../../../molecules/GroupedButtons/V1';
import ScrollViewWithCustomScroll from '../../../molecules/ScrollViewWithCustomScroll';
import { type NotificationsScreenProps } from '../props';
import NotificationScreenItemV1 from './NotificationScreenItemV1';

const windowWidth = Dimensions.get('window').width;

const NotificationsScreenWithoutI18n = ({ notifications }: NotificationsScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);

  const content = notifications.map((notification, index) => (
    <NotificationScreenItemV1 key={index} notification={notification} />
  ));

  return (
    <>
      <GroupedButtonsV1
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

const NotificationsScreenV1 = (props: NotificationsScreenProps) => (
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

export default NotificationsScreenV1;
