import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';

const FeedbackDirtyIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="none">
      <Rect width={30} height={30} rx={8} fill={svgColor} />
      <Path
        d="M19.327 9.6719L19.3571 9.69034C20.1107 10.1529 20.4889 10.7768 20.5059 11.5013C20.5206 12.1332 20.2502 12.7328 20.0354 13.1683C19.9681 13.3048 19.9058 13.4269 19.8491 13.538C19.6929 13.8439 19.5792 14.0666 19.5213 14.2771C19.5006 14.3521 19.497 14.3954 19.4968 14.4157C19.4997 14.4182 19.5033 14.4211 19.5078 14.4246C19.6287 14.503 19.8551 14.5544 20.29 14.4967C20.6484 14.4493 21.0293 14.3472 21.4578 14.2324C21.5562 14.206 21.6571 14.179 21.7608 14.1518L21.8544 14.1272H21.9511C22.9463 14.1272 23.75 14.9336 23.75 15.9277C23.75 16.9102 22.9576 17.7404 21.9511 17.7404H21.8977L21.8449 17.7329C21.6354 17.7029 21.4393 17.6712 21.254 17.6412C20.8425 17.5747 20.4838 17.5167 20.1483 17.5052C19.9343 17.4978 19.7884 17.514 19.6936 17.5401C19.7804 17.6223 19.8952 17.7117 20.0509 17.833C20.1264 17.8918 20.2117 17.9582 20.308 18.0349C20.6188 18.2823 21.0372 18.6365 21.2891 19.1157C21.5718 19.6534 21.6142 20.283 21.2988 20.9637L21.2602 21.047L21.2027 21.1185C20.8089 21.608 20.3073 22.004 19.6583 21.9255C19.3711 21.8907 19.1376 21.768 18.9658 21.6548C18.7986 21.5446 18.6401 21.4089 18.5146 21.3015L18.511 21.2985C18.2315 21.0592 18.0196 20.8816 17.7617 20.7742C17.5646 20.6921 17.3123 20.6413 16.951 20.7131C16.9429 20.7965 16.9404 20.903 16.9411 21.0454C16.9413 21.0861 16.9418 21.1313 16.9424 21.1794C16.9437 21.3017 16.9453 21.4425 16.9427 21.5749C16.9354 21.9341 16.8998 22.451 16.6293 22.8973C16.3195 23.4085 15.7937 23.6924 15.1108 23.7441C14.5698 23.7869 14.1376 23.593 13.8281 23.263C13.562 22.9793 13.414 22.6203 13.3212 22.3875C13.3 22.3343 13.2811 22.2863 13.2638 22.2425C13.1971 22.0733 13.1561 21.9693 13.1106 21.8896C13.0769 21.8993 13.0333 21.9178 12.9737 21.9514C12.9126 21.986 12.8485 22.0283 12.7624 22.0867C12.7549 22.0918 12.7471 22.0971 12.7391 22.1025C12.664 22.1535 12.5681 22.2187 12.4694 22.2773C12.2479 22.4088 11.9143 22.569 11.4928 22.5407C11.068 22.5122 10.6927 22.303 10.3529 21.9944L10.35 21.9918L10.35 21.9918C10.0193 21.6882 9.89833 21.2695 9.85479 20.9788C9.81099 20.6864 9.81896 20.3433 9.91383 20.0698C10.0487 19.6765 10.3183 19.3411 10.5384 19.0903C10.6369 18.978 10.7419 18.8652 10.8387 18.761C10.8558 18.7427 10.8726 18.7246 10.8891 18.7068C11.0033 18.5838 11.1061 18.4714 11.1983 18.3613C11.3919 18.1299 11.483 17.9712 11.5141 17.8596C11.5264 17.8155 11.5328 17.775 11.5132 17.7189C11.3533 17.7867 11.177 17.9022 10.9347 18.0609C10.852 18.1151 10.7617 18.1743 10.6617 18.2383C10.4793 18.3551 10.267 18.4842 10.047 18.5827C9.83211 18.6789 9.55114 18.7735 9.24045 18.7636C8.89746 18.7527 8.5719 18.6155 8.31425 18.3412C8.07848 18.0903 7.93349 17.7614 7.83801 17.409L7.83746 17.407C7.64853 16.7017 7.76414 16.0905 8.15939 15.6053C8.50153 15.1854 9.00134 14.9342 9.37908 14.7572C9.48612 14.7071 9.58661 14.6614 9.68156 14.6183C9.97276 14.486 10.2118 14.3774 10.4278 14.2359C10.6873 14.066 10.8027 13.9143 10.8485 13.7438C10.9069 13.5253 10.8533 13.2857 10.4789 12.9113C10.1602 12.5928 9.73631 12.3035 9.25689 11.9763C9.14776 11.9018 9.03576 11.8254 8.92146 11.7462C8.63193 11.5456 8.3297 11.327 8.07049 11.0933C7.8162 10.864 7.55478 10.5779 7.39734 10.2276C7.22682 9.84825 7.1903 9.41691 7.36224 8.97602C7.52174 8.56702 7.83509 8.21544 8.2311 7.901L19.327 9.6719ZM19.327 9.6719L19.2954 9.65635M19.327 9.6719L19.2954 9.65635M19.2954 9.65635C18.6863 9.35722 18.0714 9.27724 17.5236 9.57586C17.038 9.84062 16.7829 10.319 16.633 10.6445C16.6141 10.6856 16.5956 10.7273 16.5776 10.7689C16.5643 10.5673 16.5496 10.3472 16.5291 10.1328C16.48 9.62111 16.3851 8.9379 16.0479 8.4406C15.86 8.16343 15.5812 7.91914 15.1914 7.81278C14.8154 7.71015 14.426 7.7607 14.0522 7.89159L14.0504 7.89223M19.2954 9.65635L14.0504 7.89223M14.0504 7.89223C13.3408 8.14281 12.8661 8.59475 12.7369 9.24518C12.628 9.79369 12.8067 10.3365 12.9359 10.6884C12.9713 10.785 13.0081 10.8793 13.0417 10.9652L13.0494 10.985C13.0772 11.0557 13.1023 11.1201 13.1257 11.182M14.0504 7.89223L13.1257 11.182M13.1257 11.182C13.0837 11.138 13.0355 11.0801 12.9814 11.0044C12.7635 10.6999 12.5775 10.3033 12.3561 9.83126C12.2821 9.6735 12.2041 9.50731 12.1197 9.33329C11.9632 9.01077 11.7868 8.67086 11.5829 8.36798C11.3813 8.06866 11.1246 7.7622 10.7895 7.54527C10.435 7.31572 10.0108 7.1994 9.53601 7.27093C9.08432 7.33898 8.65104 7.56718 8.23132 7.90083L13.1257 11.182ZM19.4871 14.4063C19.4871 14.4063 19.4873 14.4066 19.4878 14.4072L19.4871 14.4063ZM16.1683 11.6567C16.1683 11.6565 16.1701 11.6544 16.1739 11.6512C16.1702 11.6554 16.1683 11.657 16.1683 11.6567ZM13.2378 11.5584C13.238 11.5611 13.238 11.5624 13.2379 11.5624C13.2379 11.5623 13.2378 11.561 13.2378 11.5584Z"
        stroke={colors.backgroundPrimaryColor}
        strokeWidth={1.5}
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

export default FeedbackDirtyIcon;
