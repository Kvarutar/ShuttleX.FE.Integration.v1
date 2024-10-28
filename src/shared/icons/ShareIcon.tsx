import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/v2/themeContext';

const ShareIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.74681 3.04829C4.40529 3.39523 4.40969 3.95334 4.75663 4.29486C5.10357 4.63638 5.66167 4.63198 6.00319 4.28504L4.74681 3.04829ZM8.62819 1.61837C8.96971 1.27143 8.96531 0.713329 8.61837 0.37181C8.27143 0.0302913 7.71333 0.0346858 7.37181 0.381626L8.62819 1.61837ZM8.62819 0.381626C8.28667 0.0346858 7.72857 0.0302913 7.38163 0.37181C7.03469 0.713329 7.03029 1.27143 7.37181 1.61837L8.62819 0.381626ZM9.99681 4.28504C10.3383 4.63198 10.8964 4.63638 11.2434 4.29486C11.5903 3.95334 11.5947 3.39523 11.2532 3.04829L9.99681 4.28504ZM8.88148 1C8.88148 0.513171 8.48683 0.118519 8 0.118519C7.51317 0.118519 7.11852 0.513171 7.11852 1H8.88148ZM7.11852 9.88889C7.11852 10.3757 7.51317 10.7704 8 10.7704C8.48683 10.7704 8.88148 10.3757 8.88148 9.88889H7.11852ZM3.6252 8.1037C4.11203 8.1037 4.50668 7.70905 4.50668 7.22222C4.50668 6.73539 4.11203 6.34074 3.6252 6.34074V8.1037ZM2.0805 7.35751L1.7387 6.54499L1.7386 6.54504L2.0805 7.35751ZM1.13321 8.31991L1.94944 8.65276L1.94946 8.6527L1.13321 8.31991ZM1.19074 16.029L1.97866 15.6338L1.97866 15.6338L1.19074 16.029ZM1.95533 16.8064L2.36057 16.0236L2.36044 16.0235L1.95533 16.8064ZM14.0444 16.8064L13.6393 16.0235L13.6392 16.0236L14.0444 16.8064ZM14.8094 16.029L14.0215 15.6337L14.0215 15.6338L14.8094 16.029ZM14.8667 8.31991L15.683 7.98714L15.683 7.98711L14.8667 8.31991ZM13.9197 7.35751L14.2617 6.54505L14.2615 6.54498L13.9197 7.35751ZM12.375 6.34074C11.8882 6.34074 11.4935 6.73539 11.4935 7.22222C11.4935 7.70905 11.8882 8.1037 12.375 8.1037V6.34074ZM6.00319 4.28504L8.62819 1.61837L7.37181 0.381626L4.74681 3.04829L6.00319 4.28504ZM7.37181 1.61837L9.99681 4.28504L11.2532 3.04829L8.62819 0.381626L7.37181 1.61837ZM7.11852 1V9.88889H8.88148V1H7.11852ZM3.6252 6.34074C3.22975 6.34074 2.88833 6.34025 2.60675 6.35976C2.31697 6.37984 2.02612 6.42409 1.7387 6.54499L2.4223 8.17003C2.45649 8.15564 2.53029 8.13225 2.72862 8.11851C2.93513 8.1042 3.20526 8.1037 3.6252 8.1037V6.34074ZM1.7386 6.54504C1.09164 6.81729 0.58172 7.33774 0.316963 7.98712L1.94946 8.6527C2.03993 8.43079 2.21178 8.25862 2.42241 8.16998L1.7386 6.54504ZM0.316985 7.98707C0.199828 8.27436 0.156765 8.56524 0.137152 8.85718C0.118056 9.14145 0.118519 9.48659 0.118519 9.88889H1.88148C1.88148 9.46283 1.88194 9.18682 1.89615 8.97535C1.90984 8.77156 1.93338 8.69212 1.94944 8.65276L0.316985 7.98707ZM0.118519 9.88889V14.1556H1.88148V9.88889H0.118519ZM0.118519 14.1556C0.118519 14.6391 0.117854 15.0538 0.1452 15.3937C0.173346 15.7436 0.23537 16.0904 0.402825 16.4242L1.97866 15.6338C1.95537 15.5873 1.92203 15.4952 1.90249 15.2523C1.88215 14.9995 1.88148 14.6677 1.88148 14.1556H0.118519ZM0.402818 16.4242C0.652798 16.9226 1.05311 17.332 1.55021 17.5893L2.36044 16.0235C2.19896 15.94 2.06423 15.8044 1.97866 15.6338L0.402818 16.4242ZM1.55008 17.5892C1.88329 17.7617 2.22974 17.8254 2.5768 17.8543C2.9132 17.8822 3.32297 17.8815 3.7973 17.8815V16.1185C3.29344 16.1185 2.96922 16.1178 2.72267 16.0973C2.48678 16.0778 2.40134 16.0447 2.36057 16.0236L1.55008 17.5892ZM3.7973 17.8815H12.2031V16.1185H3.7973V17.8815ZM12.2031 17.8815C12.6774 17.8815 13.0871 17.8822 13.4233 17.8543C13.7704 17.8254 14.1166 17.7617 14.4497 17.5892L13.6392 16.0236C13.5983 16.0448 13.5129 16.0778 13.2774 16.0973C13.031 16.1178 12.707 16.1185 12.2031 16.1185V17.8815ZM14.4496 17.5893C14.9461 17.3323 15.3472 16.9231 15.5974 16.4241L14.0215 15.6338C13.9362 15.8039 13.8013 15.9397 13.6393 16.0235L14.4496 17.5893ZM15.5973 16.4242C15.7647 16.0906 15.8267 15.744 15.8548 15.3945C15.8821 15.055 15.8815 14.6408 15.8815 14.1583H14.1185C14.1185 14.6695 14.1179 15.0007 14.0975 15.2531C14.078 15.4956 14.0447 15.5875 14.0215 15.6337L15.5973 16.4242ZM15.8815 14.1583V9.88889H14.1185V14.1583H15.8815ZM15.8815 9.88889C15.8815 9.48654 15.8819 9.14141 15.8628 8.85712C15.8432 8.56516 15.8001 8.27436 15.683 7.98714L14.0505 8.65268C14.0666 8.69213 14.0901 8.77164 14.1038 8.97541C14.118 9.18686 14.1185 9.46288 14.1185 9.88889H15.8815ZM15.683 7.98711C15.4183 7.33798 14.9088 6.8174 14.2617 6.54505L13.5778 8.16997C13.7882 8.25851 13.9599 8.43056 14.0505 8.65272L15.683 7.98711ZM14.2615 6.54498C13.9741 6.42409 13.6832 6.37984 13.3935 6.35976C13.1119 6.34025 12.7705 6.34074 12.375 6.34074V8.1037C12.795 8.1037 13.0651 8.1042 13.2716 8.11851C13.4699 8.13225 13.5437 8.15564 13.578 8.17004L14.2615 6.54498Z"
        fill={svgColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 18,
  },
});

export default ShareIcon;
