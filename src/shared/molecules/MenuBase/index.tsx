import { useEffect, useState } from 'react';
import { Dimensions, type LayoutChangeEvent, Platform, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { getMenuIcons } from '../../../utils/menu/menuIcons';
import { type MenuNavigationBlocks } from '../../../utils/menu/type';
import Text from '../../atoms/Text';
import GroupedBrandIconMini from '../../icons/GroupedBrandIconMini/V2';
import MenuUserImage from '../../images/MenuUserImage';
import SafeAreaView from '../SafeAreaView';
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
  label,
  style,
  currentRoute,
}: MenuBaseProps) => {
  const { colors } = useTheme();
  const translateX = useSharedValue(-constants.menuWidth);

  const topOffset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  const [imageHeight, setImageHeight] = useState(0);

  const handleImageLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setImageHeight(height);
  };

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
    //TODO send user to our website
  };
  const computedStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: colors.backgroundPrimaryColor,
      width: constants.menuWidth,
      height: windowSizes.height,
      paddingBottom: Platform.OS === 'android' ? sizes.paddingVertical : 16,
      shadowColor: colors.iconPrimaryColor,
    },
    gameButton: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    primaryColorBackground: {
      backgroundColor: colors.primaryColor,
      justifyContent: 'flex-end',
    },
    container: {
      paddingTop: 96 + imageHeight / 2 + 22 - topOffset,
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
        {getMenuIcons(key as MenuNavigationBlocks)}
        <Text style={styles.navigationItemTitle}>{menuitem.title}</Text>
      </View>
      {menuitem.content}
    </Pressable>
  ));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.window, animatedStyles, style]}>
        <SafeAreaView containerStyle={[styles.wrapper, computedStyles.wrapper]}>
          <View style={[styles.primaryColorBackground, computedStyles.primaryColorBackground]}>
            <View style={[styles.profileImage, computedStyles.profileImage]} onLayout={handleImageLayout}>
              <MenuUserImage url={userImageUri} />
              {label}
            </View>
          </View>

          <View style={[styles.container, computedStyles.container]}>
            <View style={styles.gapAdditionalContent}>
              <View style={styles.profile}>
                <Text style={styles.name}>{userName ?? ''}</Text>
              </View>
              {additionalContent}
            </View>
            <ScrollViewWithCustomScroll barStyle={styles.scrollBarStyle}>
              {navigationContent}
            </ScrollViewWithCustomScroll>
            <View style={styles.bottomButtons}>
              {additionalButton}
              <Pressable onPress={goToSite}>
                <GroupedBrandIconMini style={styles.brandIconsStyle} />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
        <Pressable style={styles.outsider} onPress={closeMenu} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
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
    zIndex: -1,
    height: windowSizes.height,
  },
  primaryColorBackground: {
    height: 96,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
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
    paddingBottom: 16,
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
});

export default MenuBase;
