import React, { type ReactNode, useEffect } from 'react';
import { Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import Blur from '../../atoms/Blur';
import Text from '../../atoms/Text';
import BecomeDriverIcon from '../../icons/BecomeDriverIcon';
import GroupedBrandIconMini from '../../icons/GroupedBrandIconMini';
import HelpIcon from '../../icons/HelpIcon';
import NotificationIcon from '../../icons/NotificationIcon';
import SubscriptionIcon from '../../icons/SubscriptionIcon';
import WalletIcon from '../../icons/WalletIcon';
import MenuUserImage from '../../images/MenuUserImage';
import { type MenuBaseProps, type MenuNavigationBlocks } from './props';

const windowSizes = Dimensions.get('window');

const constants = {
  animationDurations: {
    menu: 200,
    blur: 80,
  },
  menuWidth: windowSizes.width * 0.7,
};

const navigationIcons: Record<MenuNavigationBlocks, ReactNode> = {
  becomeDriver: <BecomeDriverIcon />,
  help: <HelpIcon />,
  notifications: <NotificationIcon />,
  subscription: <SubscriptionIcon />,
  wallet: <WalletIcon />,
};

const MenuBase = ({ onClose, userImage, userName, userSurname, additionalContent, menuNavigation }: MenuBaseProps) => {
  const { colors } = useTheme();
  const translateX = useSharedValue(-constants.menuWidth);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: constants.animationDurations.menu });
  }, [translateX]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const closeMenu = () => {
    translateX.value = withTiming(-constants.menuWidth, { duration: constants.animationDurations.menu }, () =>
      runOnJS(onClose)(),
    );
  };

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
    container: {
      paddingVertical: Platform.OS === 'android' ? sizes.paddingVertical : 0,
    },
    signUpLabel: {
      color: colors.primaryColor,
    },
  });

  const pan = Gesture.Pan()
    .onChange(event => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(event => {
      if (event.translationX < 0) {
        runOnJS(closeMenu)();
      }
    });

  const navigationContent = Object.entries(menuNavigation).map((nav, index) => (
    <Pressable key={index} style={styles.navigationItem} onPress={nav[1].navFunc}>
      <View style={styles.navigationItemWrapper}>
        {navigationIcons[nav[0] as MenuNavigationBlocks]}
        <Text style={styles.navigationItemTitle}>{nav[1].title}</Text>
      </View>
      {nav[1].content}
    </Pressable>
  ));

  return (
    <>
      <Blur animationDuration={constants.animationDurations.blur} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.window, animatedStyles]}>
          <SafeAreaView style={[styles.wrapper, computedStyles.wrapper]}>
            <View style={[styles.container, computedStyles.container]}>
              <View style={styles.content}>
                <View style={styles.profile}>
                  <MenuUserImage url={userImage ?? ''} />
                  <View>
                    <Text style={styles.name}>{userName ?? ''}</Text>
                    <Text style={styles.surname}>{userSurname ?? ''}</Text>
                  </View>
                </View>
                {additionalContent}
                <View style={styles.navigation}>{navigationContent}</View>
              </View>
              <GroupedBrandIconMini />
            </View>
          </SafeAreaView>
          <Pressable style={styles.outsider} onPress={closeMenu} />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  outsider: {
    flex: 1,
  },
  wrapper: {
    width: constants.menuWidth,
    height: windowSizes.height,
  },
  container: {
    flex: 1,
    paddingHorizontal: sizes.paddingHorizontal,
    justifyContent: 'space-between',
  },
  content: {
    gap: 40,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
  },
  surname: {
    fontFamily: 'Inter Medium',
    fontSize: 18,
  },
  navigation: {
    gap: 10,
  },
  navigationItem: {
    paddingHorizontal: 26,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navigationItemTitle: {
    fontFamily: 'Inter Medium',
  },
  navigationItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default MenuBase;
