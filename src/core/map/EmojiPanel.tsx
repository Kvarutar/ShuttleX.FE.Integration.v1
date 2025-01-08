import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import emojiIcons from '../../assets/img/emojiIcons';
import { defaultShadow } from '../themes/shadows';
import { useTheme } from '../themes/v2/themeContext';

const EmojiPanel = () => {
  const { colors } = useTheme();
  const [selectedEmoji, setSelectedEmoji] = useState(emojiIcons.shockedEmojiIcon);
  const [showPanel, setShowPanel] = useState(false);
  const emojis = Object.entries(emojiIcons);

  const computedStyles = StyleSheet.create({
    markerContainer: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
    panel: {
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });
  return (
    <View style={styles.container}>
      <Shadow {...defaultShadow(colors.strongShadowColor)}>
        <Pressable onPress={() => setShowPanel(!showPanel)}>
          <View style={[styles.markerContainer, computedStyles.markerContainer]}>
            <Image source={selectedEmoji} style={styles.emojiIcon} />
          </View>
        </Pressable>
      </Shadow>

      {showPanel && (
        <Shadow safeRender {...defaultShadow(colors.strongShadowColor)}>
          <View style={[styles.panel, computedStyles.panel]}>
            {emojis.map(([key, emoji]) => (
              <Pressable
                key={key}
                onPress={() => {
                  setSelectedEmoji(emoji);
                  setShowPanel(false);
                }}
              >
                <Image source={emoji} style={styles.emojiIcon} />
              </Pressable>
            ))}
          </View>
        </Shadow>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    gap: 6,
  },
  markerContainer: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 21,
  },
  emojiIcon: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
  panel: {
    borderRadius: 100,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 8,
  },
});

export default EmojiPanel;
