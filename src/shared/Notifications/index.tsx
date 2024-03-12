import React, { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet } from 'react-native';

import i18nIntegration from '../../core/locales/i18n';
import sizes from '../../core/themes/sizes';
import GroupedButtons from '../Widgets/GroupedButtons';
import ScrollViewWithCustomScroll from '../Widgets/ScrollViewWithCustomScroll';
import NotificationItem from './NotificationItem';
import { type NotificationsProps } from './props';

const windowWidth = Dimensions.get('window').width;

const NotificationsWithoutI18n = ({ notifications }: NotificationsProps): JSX.Element => {
  const { t } = useTranslation();
  const [isFirstButtonSelected, setIsFirstButtonSelected] = useState(true);

  const content = notifications.map((notification, index) => (
    <NotificationItem key={index} notification={notification} />
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
      <ScrollViewWithCustomScroll
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
        visibleBarOffset={0}
        barStyle={styles.barStyle}
      >
        {content}
      </ScrollViewWithCustomScroll>
    </>
  );
};

const Notifications = (props: NotificationsProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <NotificationsWithoutI18n {...props} />
  </I18nextProvider>
);

const styles = StyleSheet.create({
  groupedButtons: {
    marginBottom: 20,
  },
  barStyle: {
    top: 0,
  },
  scrollView: {
    marginTop: -10,
    marginBottom: -sizes.paddingVertical,
  },
  contentContainer: {
    gap: 16,
    paddingTop: 10,
    paddingBottom: sizes.paddingVertical,
  },
});

export default Notifications;
