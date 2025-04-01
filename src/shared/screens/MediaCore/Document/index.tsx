import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import Bar from '../../../atoms/Bar';
import { BarModes } from '../../../atoms/Bar/types';
import Text from '../../../atoms/Text';
import { TextElipsizeMode } from '../../../atoms/Text/props';
import CloseIconMini from '../../../icons/CloseIconMini';
import DocumentIcon from '../../../icons/DocumentIcon';
import { mediaConsts } from '../types';
import { type DocumentProps } from './types';

const Document = ({ selectedDocument, onCloseButtonPress }: DocumentProps) => {
  return (
    <Animated.View entering={FadeIn.duration(mediaConsts.fadeAnimationDuration)}>
      <Bar style={styles.bar} mode={BarModes.Disabled}>
        <View style={styles.content}>
          <DocumentIcon />
          <Text style={styles.fileName} numberOfLines={1} elipsizeMode={TextElipsizeMode.Middle}>
            {selectedDocument.name}
          </Text>
        </View>
        <Pressable style={styles.closeButton} onPress={onCloseButtonPress}>
          <CloseIconMini />
        </Pressable>
      </Bar>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bar: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  fileName: {
    fontFamily: 'Inter Medium',
    fontSize: 14,
    flexShrink: 1,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
});

export default Document;
