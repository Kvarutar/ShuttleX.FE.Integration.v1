import { type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const VoiceChatIcon = ({
  style,
  color,
  strokeColor,
  width = 20,
  height = 20,
}: {
  style?: StyleProp<ViewStyle>;
  color?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
}): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.backgroundTertiaryColor;
  const strokeSvgColor = strokeColor ?? colors.primaryColor;

  return (
    <Svg
      style={style}
      width={width}
      height={height}
      viewBox="0 0 30 30"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="30" height="30" rx="10" fill={svgColor} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 5C15.5523 5 16 5.40701 16 5.90909V24.0909C16 24.593 15.5523 25 15 25C14.4477 25 14 24.593 14 24.0909V5.90909C14 5.40701 14.4477 5 15 5Z"
        fill={strokeSvgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 8C10.5523 8 11 8.65979 11 9.47368V20.5263C11 21.3402 10.5523 22 10 22C9.44772 22 9 21.3402 9 20.5263V9.47368C9 8.65979 9.44772 8 10 8Z"
        fill={strokeSvgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 11.5C25.5523 11.5 26 11.9477 26 12.5V17.5C26 18.0523 25.5523 18.5 25 18.5C24.4477 18.5 24 18.0523 24 17.5V12.5C24 11.9477 24.4477 11.5 25 11.5Z"
        fill={strokeSvgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 12C5.55228 12 6 12.4477 6 13V18C6 18.5523 5.55228 19 5 19C4.44772 19 4 18.5523 4 18V13C4 12.4477 4.44772 12 5 12Z"
        fill={strokeSvgColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 7.75C20.5523 7.75 21 8.19772 21 8.75V21.25C21 21.8023 20.5523 22.25 20 22.25C19.4477 22.25 19 21.8023 19 21.25V8.75C19 8.19772 19.4477 7.75 20 7.75Z"
        fill={strokeSvgColor}
      />
    </Svg>
  );
};

export default VoiceChatIcon;
