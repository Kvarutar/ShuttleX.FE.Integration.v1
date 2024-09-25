import { useEffect } from 'react';
import { Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { getMenuIcons } from '../../../utils/menu/menuIcons';
import { type MenuNavigationBlocks } from '../../../utils/menu/type';
import Text from '../../atoms/Text';
import GroupedBrandIconMini from '../../icons/GroupedBrandIconMini/V2';
import MenuUserImage from '../../images/MenuUserImage';
import ScrollViewWithCustomScroll from '../ScrollViewWithCustomScroll';
import { type MenuBaseProps } from './props';

const windowSizes = Dimensions.get('window');

const constants = {
  animationDurations: {
    menu: 200,
    blur: 80,
  },
  menuWidth: windowSizes.width * 0.7,
};

const MenuBase = ({
  onClose,
  userImageUri,
  userName,
  userSurname,
  additionalContent,
  additionalButton,
  menuNavigation,
  style,
  currentRoute,
}: MenuBaseProps) => {
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
    safeAreaStyle: {
      backgroundColor: colors.backgroundPrimaryColor,
      width: constants.menuWidth,
      height: windowSizes.height,
      paddingBottom: Platform.OS === 'android' ? sizes.paddingVertical : 0,
    },
    gameButton: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    primaryColorBackground: {
      backgroundColor: colors.primaryColor,
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
      style={[styles.navigationItem, currentRoute.toLowerCase() === key && styles.selectedNavigationItem]}
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
        <SafeAreaView style={computedStyles.safeAreaStyle}>
          <ScrollViewWithCustomScroll
            contentContainerStyle={styles.scrollViewContent}
            wrapperStyle={styles.wrapper}
            barStyle={styles.scrollBarStyle}
          >
            <View style={[styles.primaryColorBackground, computedStyles.primaryColorBackground]} />
            <View style={styles.container}>
              <View style={styles.content}>
                <View style={styles.gapAdditionalContent}>
                  <View style={styles.profile}>
                    <MenuUserImage url={userImageUri} style={styles.profileImage} />
                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>{userName ?? ''}</Text>
                      <Text style={styles.name}>{userSurname ?? ''}</Text>
                    </View>
                  </View>
                  {additionalContent}
                </View>
                <View style={styles.navigation}>{navigationContent}</View>
              </View>
              <View style={styles.bottomButtons}>
                {additionalButton}
                <GroupedBrandIconMini style={styles.brandIconsStyle} />
              </View>
            </View>
          </ScrollViewWithCustomScroll>
        </SafeAreaView>
        <Pressable style={styles.outsider} onPress={closeMenu} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
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
    flexGrow: 1,
  },
  primaryColorBackground: {
    height: 96,
  },
  profileImage: {
    borderRadius: 1000,
    position: 'absolute',
    top: -40,
    left: 16,
  },

  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: sizes.paddingHorizontal,
  },
  content: {
    gap: 26,
  },
  profile: {
    paddingHorizontal: sizes.paddingHorizontal,
  },
  nameContainer: {
    marginTop: sizes.paddingVertical + 22,
    flexDirection: 'row',
    gap: 2,
  },
  name: {
    fontFamily: 'Inter Medium',
    fontSize: 21,
  },
  navigation: {
    gap: 4,
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
  gapAdditionalContent: {
    gap: 15,
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
