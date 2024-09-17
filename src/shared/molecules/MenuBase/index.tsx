import { useEffect, useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { Dimensions, Platform, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import i18nIntegration from '../../../core/locales/i18n';
import sizes from '../../../core/themes/sizes';
import { useTheme } from '../../../core/themes/v2/themeContext';
import { getMenuIcons } from '../../../utils/menu/menuIcons';
import { type MenuNavigationBlocks } from '../../../utils/menu/type';
import Blur from '../../atoms/Blur';
import Text from '../../atoms/Text';
import GameIcon from '../../icons/GameIcon';
import GroupedBrandIconMini from '../../icons/GroupedBrandIconMini/V2';
import PlayIcon from '../../icons/PlayIcon';
import MenuUserImage from '../../images/MenuUserImage';
import { type MenuBaseProps } from './props';

const windowSizes = Dimensions.get('window');

const constants = {
  animationDurations: {
    menu: 200,
    blur: 80,
  },
  menuWidth: windowSizes.width * 0.7,
};

const MenuBaseWithoutI18n = ({
  onClose,
  userImageUri,
  userName,
  userSurname,
  additionalContent,
  menuNavigation,
  style,
}: MenuBaseProps) => {
  const { colors } = useTheme();
  const translateX = useSharedValue(-constants.menuWidth);
  const [selectedItem, setSelectedItem] = useState<string | number>();
  const { t } = useTranslation();

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
    gameButton: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    greenBackground: {
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

  const navigationContent = Object.entries(menuNavigation).map((nav, index) => (
    <Pressable
      key={index}
      style={[styles.navigationItem, selectedItem === index && styles.selectedNavigationItem]}
      onPress={() => {
        nav[1].navFunc();
        setSelectedItem(index);
      }}
    >
      <View style={styles.itemsWrapper}>
        {getMenuIcons(nav[0] as MenuNavigationBlocks)}
        <Text style={styles.navigationItemTitle}>{nav[1].title}</Text>
      </View>
      {nav[1].content}
    </Pressable>
  ));

  return (
    <>
      <Blur animationDuration={constants.animationDurations.blur} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.window, animatedStyles, style]}>
          <SafeAreaView style={[styles.wrapper, computedStyles.wrapper]}>
            <View style={styles.greenBackground} />
            <View style={[styles.container, computedStyles.container]}>
              <View style={styles.content}>
                <View style={styles.profile}>
                  <MenuUserImage url={userImageUri} style={styles.profileImage} />
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>{userName ?? ''}</Text>
                    <Text style={styles.surname}>{userSurname ?? ''}</Text>
                  </View>
                </View>
                {additionalContent}
                <View style={styles.navigation}>{navigationContent}</View>
              </View>
              <View style={styles.bottomButtons}>
                <Pressable style={[computedStyles.gameButton, styles.gameButton]}>
                  <View style={styles.itemsWrapper}>
                    <GameIcon />
                    <Text>{t('Menu_playGameButton')}</Text>
                  </View>
                  <PlayIcon />
                </Pressable>
                <GroupedBrandIconMini style={styles.brandIconsStyle} />
              </View>
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
  greenBackground: {
    height: 96,
    position: 'relative',
    top: 0,
    left: 0,
  },
  profileImage: {
    borderRadius: 100,
  },

  container: {
    flex: 1,
    position: 'relative',
    top: -40,
    justifyContent: 'space-between',
    paddingHorizontal: sizes.paddingHorizontal,
  },
  content: {
    gap: 26,
  },
  profile: {
    gap: 22,
    paddingHorizontal: sizes.paddingHorizontal,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  name: {
    fontFamily: 'Inter Medium',
    fontSize: 21,
  },
  surname: {
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

  navigationItemTitle: {
    fontFamily: 'Inter Medium',
    fontSize: 17,
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
  },
  brandIconsStyle: {
    marginLeft: 16,
  },
});

const MenuBase = (props: MenuBaseProps) => (
  <I18nextProvider i18n={i18nIntegration}>
    <MenuBaseWithoutI18n {...props} />
  </I18nextProvider>
);

export default MenuBase;
