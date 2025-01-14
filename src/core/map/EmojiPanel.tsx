import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import emojiIcons from '../../assets/img/emojiIcons';
import { defaultShadow } from '../themes/shadows';
import { useTheme } from '../themes/v2/themeContext';

const EmojiPanel = () => {
  const { colors } = useTheme();
  const [selectedEmoji, setSelectedEmoji] = useState(emojiIcons.hiEmojiIcon);
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
            <ScrollView horizontal contentContainerStyle={styles.scrollWiewContainer}>
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
            </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 21,
  },
  emojiIcon: {
    width: 32,
    height: 24,
    resizeMode: 'contain',
  },
  panel: {
    borderRadius: 100,
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: 222,
    overflow: 'hidden',
    paddingVertical: 2,
  },
  scrollWiewContainer: {
    gap: 8,
    paddingVertical: 10,
  },
});

export default EmojiPanel;
