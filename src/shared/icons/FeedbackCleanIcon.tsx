import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const FeedbackCleanIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.primaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={svgColor} />
      <Path
        d="M19.2322 7.23196C18.8739 7.59025 18.3527 7.89403 17.8329 8.13593C17.3639 8.35425 17.3639 9.24145 17.8329 9.45977C18.3527 9.70167 18.8739 10.0055 19.2322 10.3637C19.5905 10.722 19.8943 11.2433 20.1362 11.763C20.3545 12.2321 21.2417 12.2321 21.46 11.763C21.7019 11.2433 22.0057 10.722 22.364 10.3637C22.7223 10.0055 23.2435 9.70167 23.7632 9.45977C24.2323 9.24146 24.2323 8.35425 23.7632 8.13593C23.2435 7.89403 22.7223 7.59025 22.364 7.23196C22.0057 6.87367 21.7019 6.35241 21.46 5.8327C21.2417 5.36365 20.3545 5.36365 20.1362 5.8327C19.8943 6.35241 19.5905 6.87367 19.2322 7.23196Z"
        stroke={colors.backgroundPrimaryColor}
      />
      <Path
        d="M8.85151 12.8518C8.10341 13.5999 6.88198 14.1896 5.85189 14.5913C5.36987 14.7792 5.36987 15.6251 5.85189 15.813C6.88198 16.2147 8.10341 16.8044 8.85151 17.5525C9.59961 18.3006 10.1894 19.5221 10.591 20.5522C10.779 21.0342 11.6248 21.0342 11.8128 20.5522C12.2144 19.5221 12.8042 18.3006 13.5523 17.5525C14.3004 16.8044 15.5218 16.2147 16.5519 15.813C17.0339 15.6251 17.0339 14.7792 16.5519 14.5913C15.5218 14.1896 14.3004 13.5999 13.5523 12.8518C12.8042 12.1037 12.2144 10.8822 11.8128 9.85214C11.6248 9.37012 10.779 9.37012 10.591 9.85214C10.1894 10.8822 9.59961 12.1037 8.85151 12.8518Z"
        stroke={colors.backgroundPrimaryColor}
        strokeWidth={1.5}
      />
      <Path
        d="M19.5926 19.5926C19.3851 19.8001 19.1095 19.9848 18.8154 20.1445C18.3607 20.3913 18.3607 21.3059 18.8154 21.5528C19.1095 21.7125 19.3851 21.8972 19.5926 22.1046C19.8 22.3121 19.9847 22.5877 20.1444 22.8818C20.3913 23.3365 21.3059 23.3365 21.5527 22.8818C21.7124 22.5877 21.8971 22.3121 22.1046 22.1046C22.312 21.8972 22.5876 21.7125 22.8817 21.5528C23.3364 21.3059 23.3364 20.3913 22.8817 20.1445C22.5876 19.9848 22.312 19.8001 22.1046 19.5926C21.8971 19.3852 21.7124 19.1096 21.5527 18.8155C21.3059 18.3608 20.3913 18.3608 20.1444 18.8155C19.9847 19.1096 19.8 19.3852 19.5926 19.5926Z"
        stroke={colors.backgroundPrimaryColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
});

export default FeedbackCleanIcon;
