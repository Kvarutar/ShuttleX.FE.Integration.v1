import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Bar from '../../../atoms/Bar';
import { BarModes } from '../../../atoms/Bar/types';
import BigCameraIcon from '../../../icons/BigCameraIcon';
import Document from '../Document';
import Photo from '../Photo';
import { mediaConsts, MediaFileType } from '../types';
import { type SelectedFileProps } from './types';

const SelectedFilePresentation = ({ onTakePhoto, selectedFiles, onCloseFile, photoType }: SelectedFileProps) => {
  const computedStyles = StyleSheet.create({
    wrapper: {
      width: mediaConsts.photoMaxWidth,
    },
  });

  if (selectedFiles.length === 0) {
    return (
      <Animated.View
        style={[styles.wrapper, computedStyles.wrapper]}
        entering={FadeIn.duration(mediaConsts.fadeAnimationDuration)}
        exiting={FadeOut.duration(mediaConsts.fadeAnimationDuration)}
      >
        <Bar mode={BarModes.Default} style={styles.takePhoto} onPress={onTakePhoto}>
          <Pressable onPress={onTakePhoto}>
            <BigCameraIcon style={styles.bigCameraIcon} />
          </Pressable>
        </Bar>
      </Animated.View>
    );
  }

  return (
    <View style={styles.content}>
      {selectedFiles.map(file => {
        switch (file.type) {
          case MediaFileType.Photo:
            return (
              <Photo
                key={file.body.uri}
                onCloseButtonPress={() => onCloseFile(file.body.uri)}
                asset={file.body}
                type={photoType}
              />
            );
          case MediaFileType.Document:
            return (
              <Document
                key={file.body.uri}
                onCloseButtonPress={() => onCloseFile(file.body.uri)}
                selectedDocument={file.body}
              />
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 5,
    gap: 20,
  },
  takePhoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  wrapper: {
    flex: 1,
    alignSelf: 'center',
  },
  bigCameraIcon: {
    height: 250,
  },
});

export default SelectedFilePresentation;
