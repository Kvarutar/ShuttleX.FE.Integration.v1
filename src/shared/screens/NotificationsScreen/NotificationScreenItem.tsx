import { type ReactNode } from 'react';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { defaultShadow } from '../../../core/themes/shadows';
import { useTheme } from '../../../core/themes/themeContext';
import Bar from '../../atoms/Bar';
import Text from '../../atoms/Text';
import ClockIcon2 from '../../icons/ClockIcon2';
import StarIcon from '../../icons/StarIcon';
import { type Notification } from './props';

const NotificationScreenItem = ({ notification }: { notification: Notification }) => {
  const { colors } = useTheme();
  const shadowProps = defaultShadow(colors.strongShadowColor);

  const computedStyles = StyleSheet.create({
    notificationContent: {
      color: colors.textSecondaryColor,
    },
    notificationTime: {
      color: colors.textSecondaryColor,
    },
    iconWrapper: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    unreadMarker: {
      backgroundColor: colors.primaryColor,
    },
    passengerAvatarWrapper: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  const image: Record<Notification['type'], ReactNode> = {
    trip_was_rated: (
      <View>
        <Shadow {...shadowProps}>
          <View style={[styles.passengerAvatarWrapper, computedStyles.passengerAvatarWrapper]}>
            <Image style={styles.passengerAvatar} source={{ uri: notification.image?.uri }} />
          </View>
        </Shadow>
      </View>
    ),
    rating_increased: (
      <View style={[styles.iconWrapper, computedStyles.iconWrapper]}>
        <StarIcon />
      </View>
    ),
    planned_trip: (
      <View style={[styles.iconWrapper, computedStyles.iconWrapper]}>
        <ClockIcon2 color={colors.primaryColor} />
      </View>
    ),
  };

  return (
    <Bar style={styles.notification}>
      {image[notification.type]}
      <View style={styles.notificationContentWrapper}>
        <View style={styles.notificationTop}>
          <View style={styles.notificationTitleWrapper}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            {!notification.isRead && <View style={[styles.unreadMarker, computedStyles.unreadMarker]} />}
          </View>
          <Text style={[styles.notificationTime, computedStyles.notificationTime]}>{notification.time}</Text>
        </View>
        <Text style={[styles.notificationContent, computedStyles.notificationContent]}>{notification.description}</Text>
      </View>
    </Bar>
  );
};

const styles = StyleSheet.create({
  unreadMarker: {
    width: 8,
    height: 8,
    borderRadius: 100,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 16,
  },
  notificationTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  notificationTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  notificationTitle: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
    flexShrink: 1,
  },
  notificationContentWrapper: {
    flex: 1,
    gap: 4,
  },
  notificationContent: {
    fontSize: 14,
    flexShrink: 1,
  },
  notificationTime: {
    fontFamily: 'Inter Medium',
    fontSize: 12,
  },
  passengerAvatarWrapper: {
    width: 61,
    height: 61,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passengerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 100,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreenItem;
