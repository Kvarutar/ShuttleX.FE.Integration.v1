import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useThemeV1 } from '../../../core/themes/v1/themeContext';
import Bar from '../../atoms/Bar';
import { type Option } from './props';

const FeedbackScreenDescriptionItem = ({ option, onOptionSelect }: { option: Option; onOptionSelect: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  const { colors } = useThemeV1();

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
      <Bar disableShadow={!isActive} style={styles.descriptionItemBar}>
        {option.image}
      </Bar>
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
