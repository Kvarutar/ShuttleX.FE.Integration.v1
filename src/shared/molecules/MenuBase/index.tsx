import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  type LayoutChangeEvent,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/themeContext';
import { getMenuIcons } from '../../../utils/menu/menuIcons';
import { type MenuNavigationBlocks } from '../../../utils/menu/type';
import Skeleton from '../../atoms/Skeleton';
import Text from '../../atoms/Text';
import GroupedBrandIconMini from '../../icons/GroupedBrandIconMini';
import MenuUserImage from '../../images/MenuUserImage';
import ScrollViewWithCustomScroll from '../ScrollViewWithCustomScroll';
import { type MenuBaseProps } from './props';

const windowSizes = Dimensions.get('window');

const constants = {
  animationDurations: {
    menu: 200,
    blur: 80,
  },
  menuWidth: windowSizes.width * 0.75,
};

const MenuBase = ({
  onClose,
  userImageUri,
  userName,
  additionalContent,
  menuNavigation,
  additionalButton,
  isStatusBarTranslucent = false,
  label,
  style,
  currentRoute,
  isContractorMenu,
  loading,
}: MenuBaseProps) => {
  const { colors } = useTheme();
  const translateX = useSharedValue(-constants.menuWidth);

  const [imageHeight, setImageHeight] = useState(62);

  const handleImageLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (height !== imageHeight) {
        setImageHeight(height);
      }
    },
    [imageHeight],
  );

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
  const goToSite = () => {
    Linking.openURL('https://www.shuttlex.com').catch(err => console.error(err));
  };

  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.backgroundPrimaryColor,
      width: constants.menuWidth,
      gap: 22 + imageHeight / 2,
      paddingBottom: Platform.OS === 'android' ? sizes.paddingVertical : 16,
      shadowColor: colors.iconPrimaryColor,
    },
    gameButton: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    primaryColorBackgroundWithImage: {
      backgroundColor: colors.primaryColor,
      justifyContent: 'flex-end',
    },
    profileImage: {
      bottom: -imageHeight / 2,
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

  const navigationContent = Object.entries(menuNavigation).map(([key, menuitem]) => (
    <Pressable
      key={key}
      style={[styles.navigationItem, currentRoute.toLowerCase() === key.toLowerCase() && styles.selectedNavigationItem]}
      onPress={() => {
        menuitem.navFunc();
      }}
    >
      <View style={styles.itemsWrapper}>
        <View style={styles.menuIconWrapper}>{getMenuIcons(key as MenuNavigationBlocks)}</View>
        <Text style={styles.navigationItemTitle}>{menuitem.title}</Text>
      </View>
      {menuitem.content}
    </Pressable>
  ));

  return (
    <Modal transparent statusBarTranslucent={isStatusBarTranslucent} animationType="none">
      <GestureHandlerRootView style={styles.gestureView}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.window, animatedStyles, style]}>
            <View style={[styles.wrapper, computedStyles.wrapper]}>
              <View style={[styles.primaryColorBackgroundWithImage, computedStyles.primaryColorBackgroundWithImage]}>
                <View style={[styles.profileImage, computedStyles.profileImage]} onLayout={handleImageLayout}>
                  {loading?.avatar ? (
                    <Skeleton skeletonContainerStyle={styles.skeletonUserImageContainer} />
                  ) : (
                    <>
                      <MenuUserImage url={userImageUri} />
                      {label}
                    </>
                  )}
                </View>
              </View>

              <View style={styles.container}>
                <View style={styles.gapAdditionalContent}>
                  <View style={styles.profile}>
                    {loading?.username ? (
                      <Skeleton skeletonContainerStyle={styles.skeletonNameContainer} />
                    ) : (
                      <Text style={styles.name}>{userName ?? ''}</Text>
                    )}
                  </View>
                  {additionalContent}
                </View>
                <ScrollViewWithCustomScroll barStyle={styles.scrollBarStyle}>
                  {navigationContent}
                </ScrollViewWithCustomScroll>
                <View style={styles.bottomButtons}>
                  {additionalButton}
                  <Pressable onPress={goToSite}>
                    <GroupedBrandIconMini style={styles.brandIconsStyle} isContractorIcon={isContractorMenu} />
                  </Pressable>
                </View>
              </View>
            </View>
            <Pressable style={styles.outsider} onPress={closeMenu} />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  skeletonUserImageContainer: {
    width: 62,
    height: 62,
    borderRadius: 1000,
  },
  gestureView: {
    flex: 1,
  },
  skeletonNameContainer: {
    height: 24,
  },
  window: {
    flex: 1,
    flexDirection: 'row',
  },
  wrapper: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 52.7,
    elevation: 10,
  },
  outsider: {
    flex: 1,
  },
  primaryColorBackgroundWithImage: {
    height: 96,
    zIndex: -1,
  },

  profileImage: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
    justifyContent: 'space-between',
    paddingLeft: 32,
    position: 'relative',
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 26,
    paddingHorizontal: sizes.paddingHorizontal,
  },

  profile: {
    paddingHorizontal: sizes.paddingHorizontal,
  },

  name: {
    fontFamily: 'Inter Medium',
    fontSize: 21,
  },
  navigation: {
    gap: 4,
  },
  gapAdditionalContent: {
    gap: 15,
  },
  navigationItem: {
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedNavigationItem: {
    borderWidth: 1,
    borderColor: '#DEE3E4',
  },

  navigationItemTitle: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
    lineHeight: 20.57,
    letterSpacing: -0.4,
  },
  itemsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gameButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sizes.paddingHorizontal,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  bottomButtons: {
    gap: 17,
    marginTop: 'auto',
  },
  brandIconsStyle: {
    marginLeft: 12,
  },
  scrollBarStyle: {
    backgroundColor: 'transparent',
  },
  menuIconWrapper: {
    width: 20,
  },
});

export default MenuBase;
