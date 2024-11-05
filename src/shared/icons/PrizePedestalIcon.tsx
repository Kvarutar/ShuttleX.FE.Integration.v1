import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop, Text } from 'react-native-svg';

const numberColor = '#00000029'; //with opacity
const stringColor = '#00000066'; //with opacity

const PrizePedestalIcon = ({
  style,
  firstPlaceColored,
  secondPlaceColored,
  thirdPlaceColored,
}: {
  style?: StyleProp<ViewStyle>;
  firstPlaceColored: boolean;
  secondPlaceColored: boolean;
  thirdPlaceColored: boolean;
}) => {
  const computedStyles = (isColored: boolean) => {
    return {
      startColor: isColored ? '#AFDF04' : '#F9F9F9',
      endColor: isColored ? '#B7EA00' : '#F3F3F3',
      fillColor: isColored ? '#C5FB02' : '#FFFFFF',
    };
  };

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 343 167" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M20 30H117V63H0L20 30Z" fill="url(#paint0_linear)" />
      <Rect y="63" width="117" height="104" fill={computedStyles(secondPlaceColored).startColor} />

      <Path d="M323 50H226V83H343L323 50Z" fill="url(#paint1_linear)" />
      <Rect
        width="117"
        height="84"
        transform="matrix(-1 0 0 1 343 83)"
        fill={computedStyles(thirdPlaceColored).startColor}
      />

      <Path d="M123 0H220L240 43H103L123 0Z" fill="url(#paint2_linear)" />
      <Rect x="103" y="43" width="137" height="124" fill={computedStyles(firstPlaceColored).fillColor} />

      <Text x="55" y="150" fontSize="100" fill={numberColor} fontWeight="bold" textAnchor="middle">
        2
      </Text>

      <Text x="171.5" y="130" fontSize="100" fill={numberColor} fontWeight="bold" textAnchor="middle">
        1
      </Text>
      <Text x="171.5" y="155" fontSize="11" fill={stringColor} fontWeight="bold" textAnchor="middle">
        Main Present
      </Text>

      <Text x="290" y="160" fontSize="90" fill={numberColor} fontWeight="bold" textAnchor="middle">
        3
      </Text>

      <Defs>
        <LinearGradient id="paint0_linear" x1="58.5" y1="30" x2="58.5" y2="63" gradientUnits="userSpaceOnUse">
          <Stop stopColor={computedStyles(secondPlaceColored).startColor} />
          <Stop offset="1" stopColor={computedStyles(secondPlaceColored).endColor} />
        </LinearGradient>
        <LinearGradient id="paint1_linear" x1="284.5" y1="50" x2="284.5" y2="83" gradientUnits="userSpaceOnUse">
          <Stop stopColor={computedStyles(thirdPlaceColored).startColor} />
          <Stop offset="1" stopColor={computedStyles(thirdPlaceColored).endColor} />
        </LinearGradient>
        <LinearGradient id="paint2_linear" x1="171.5" y1="0" x2="171.5" y2="43" gradientUnits="userSpaceOnUse">
          <Stop stopColor={computedStyles(firstPlaceColored).startColor} />
          <Stop offset="1" stopColor={computedStyles(firstPlaceColored).endColor} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 343,
    height: 167,
  },
});

export default PrizePedestalIcon;
