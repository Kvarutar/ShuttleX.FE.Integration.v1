import { Image, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Button from '../../../atoms/Button';
import { ButtonShapes, CircleButtonModes } from '../../../atoms/Button/types';
import CloseIcon from '../../../icons/CloseIcon';
import { getCorrectURI } from '../index';
import { mediaConsts } from '../types';
import { type PhotoProps, PhotoType } from './types';

const Photo = ({ asset, onCloseButtonPress, type }: PhotoProps) => {
  let photoWidth = Math.min(mediaConsts.photoMaxWidth, Number(asset.width));
  let photoHeight = (photoWidth / Number(asset.width)) * Number(asset.height);

  if (photoHeight > mediaConsts.photoMaxHeight) {
    photoHeight = mediaConsts.photoMaxHeight;
    photoWidth = (photoHeight / Number(asset.height)) * Number(asset.width);
  }

  const borderRadius = type === PhotoType.Circle ? Math.min(photoWidth, photoHeight) / 2 : 10;

  const computedStyles = StyleSheet.create({
    photoWrapper: {
      width: photoWidth,
      height: photoHeight,
      borderRadius: borderRadius,
    },
    image: {
      width: photoWidth,
      height: photoHeight,
      borderRadius: borderRadius,
    },
    closePhotoButton: {
      bottom: type === PhotoType.Circle ? 50 : -15,
      right: type === PhotoType.Circle ? 15 : -15,
    },
  });

  if (!asset.type || !asset.uri) {
    return <></>;
  }

  return (
    <View style={[styles.photoWrapper, computedStyles.photoWrapper]}>
      <Animated.View
        style={styles.photoContainer}
        entering={FadeIn.duration(mediaConsts.fadeAnimationDuration)}
        exiting={FadeOut.duration(mediaConsts.fadeAnimationDuration)}
      >
        <Image source={{ uri: getCorrectURI(asset.uri) }} style={computedStyles.image} />

        <Button
          style={[styles.closePhotoButton, computedStyles.closePhotoButton]}
          onPress={onCloseButtonPress}
          shape={ButtonShapes.Circle}
          mode={CircleButtonModes.Mode2}
        >
          <CloseIcon />
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  photoWrapper: {
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'contain',
  },
  photoContainer: {
    flex: 1,
  },
  closePhotoButton: {
    position: 'absolute',
  },
});

export default Photo;
