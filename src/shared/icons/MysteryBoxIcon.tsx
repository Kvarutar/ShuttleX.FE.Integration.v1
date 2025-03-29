import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const MysteryBoxIcon = ({ style }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 161 161" fill="none">
      <Path
        d="M56.4989 138.313C68.2761 144.494 74.1647 147.584 80.4993 147.584V80.5007L17.6961 47.4464C17.6036 47.5951 17.5128 47.7451 17.4236 47.8966C13.416 54.7022 13.416 63.1709 13.416 80.1083V80.8932C13.416 97.8304 13.416 106.3 17.4236 113.105C21.4311 119.911 28.6482 123.698 43.0822 131.273L56.4989 138.313Z"
        fill="#B2CD4D"
      />
      <Path
        opacity={0.7}
        d="M117.916 29.7281L104.499 22.6873C92.722 16.5069 86.8334 13.4166 80.4987 13.4166C74.164 13.4166 68.2755 16.5069 56.4981 22.6873L43.0815 29.7281C28.9687 37.1341 21.7553 40.9196 17.6953 47.4456L80.4987 80.5L143.302 47.4456C139.242 40.9196 132.028 37.1341 117.916 29.7281Z"
        fill="#B2CD4D"
      />
      <Path
        opacity={0.5}
        d="M143.576 47.8966C143.487 47.7451 143.396 47.5951 143.303 47.4464L80.5 80.5007V147.584C86.8347 147.584 92.7233 144.494 104.5 138.313L117.917 131.273C132.351 123.698 139.568 119.911 143.576 113.105C147.583 106.3 147.583 97.8304 147.583 80.8932V80.1083C147.583 63.1709 147.583 54.7022 143.576 47.8966Z"
        fill="#B2CD4D"
      />
      <Path
        d="M42.4197 30.079C42.6399 29.9633 42.8619 29.8469 43.0856 29.7295L53.1047 24.4717L114.156 58.0498L141.148 44.5535C142.072 45.5996 142.875 46.7018 143.578 47.8971C144.582 49.6012 145.334 51.4095 145.898 53.4289L119.076 66.84V87.2097C119.076 89.9883 116.823 92.2409 114.044 92.2409C111.266 92.2409 109.013 89.9883 109.013 87.2097V71.8711L85.5339 83.6107V146.941C83.8105 147.37 82.1723 147.585 80.5026 147.585C78.8336 147.585 77.1947 147.37 75.4714 146.941V83.6107L15.1074 53.4289C15.6713 51.4095 16.4235 49.6012 17.4269 47.8971C18.1308 46.7018 18.9337 45.5996 19.8573 44.5535L80.5026 74.8764L103.218 63.5183L42.4197 30.079Z"
        fill="#CEFC28"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 161,
    height: 161,
  },
});

export default MysteryBoxIcon;
