import { Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import sizes from '../../../core/themes/sizes';
import Blur from '../../atoms/Blur';
import Button from '../../atoms/Button';
import { ButtonShapes, CircleButtonModes } from '../../atoms/Button/types';
import CloseIcon from '../../icons/CloseIcon';
import ShortArrowIcon from '../../icons/ShortArrowIcon';
import BottomWindow from '../BottomWindow';
import { type PopupProps } from './types';

const animationDuration = {
  closeButtonDuration: 300,
  bottomWindowDuration: 500,
};

const Popup = ({
  children,
  style,
  bottomWindowStyle,
  isWithBlur = true,
  onCloseButtonPress,
  onBackButtonPress,
}: PopupProps) => {
  const computetStyles = StyleSheet.create({
    container: {
      paddingVertical: Platform.OS === 'android' ? sizes.paddingVertical : 0,
    },
  });

  return (
    <>
      {isWithBlur && <Blur />}
      {onBackButtonPress && (
        <Animated.View
          entering={FadeIn.duration(animationDuration.closeButtonDuration)}
          exiting={FadeOut.duration(animationDuration.closeButtonDuration)}
          style={styles.topButtons}
        >
          <SafeAreaView style={computetStyles.container}>
            <Button shape={ButtonShapes.Circle} mode={CircleButtonModes.Mode2} onPress={onBackButtonPress}>
              <ShortArrowIcon />
            </Button>
          </SafeAreaView>
        </Animated.View>
      )}
      <View style={[styles.bottom, style]}>
        {onCloseButtonPress && (
          <Animated.View
            entering={FadeIn.duration(animationDuration.closeButtonDuration)}
            exiting={FadeOut.duration(animationDuration.closeButtonDuration)}
          >
            <Button
              shape={ButtonShapes.Circle}
              mode={CircleButtonModes.Mode2}
              style={styles.closeButton}
              onPress={onCloseButtonPress}
            >
              <CloseIcon />
            </Button>
          </Animated.View>
        )}
        <Animated.View
          entering={SlideInDown.duration(animationDuration.bottomWindowDuration)}
          exiting={SlideOutDown.duration(animationDuration.bottomWindowDuration)}
        >
          <BottomWindow style={styles.bottomWindow} windowStyle={bottomWindowStyle}>
            {children}
          </BottomWindow>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 26,
    marginRight: sizes.paddingHorizontal,
  },
  topButtons: {
    position: 'absolute',
    left: sizes.paddingHorizontal,
    right: sizes.paddingHorizontal,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomWindow: {
    position: 'relative',
  },
});

export default Popup;
