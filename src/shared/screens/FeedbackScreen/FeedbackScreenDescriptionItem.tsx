import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import BarV1 from '../../atoms/Bar/v1';
import { type Option } from './props';

const FeedbackScreenDescriptionItem = ({ option, onOptionSelect }: { option: Option; onOptionSelect: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const { colors } = useTheme();

  const onPress = () => {
    setIsActive(state => !state);
    onOptionSelect();
  };

  const computedStyles = StyleSheet.create({
    text: {
      color: isActive ? colors.textPrimaryColor : colors.textSecondaryColor,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.descriptionItemWrapper}>
      <BarV1 disableShadow={!isActive} style={styles.descriptionItemBar}>
        {option.image}
      </BarV1>
      <Text style={[styles.descriptionItemText, computedStyles.text]}>{option.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  descriptionItemWrapper: {
    gap: 4,
  },
  descriptionItemText: {
    fontSize: 12,
    width: 75,
    textAlign: 'center',
    fontFamily: 'Inter Medium',
  },
  descriptionItemBar: {
    padding: 10,
    alignSelf: 'center',
  },
});

export default FeedbackScreenDescriptionItem;
