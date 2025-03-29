import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useTheme } from '../../core/themes/themeContext';

const ApplePayIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.textSecondaryColor;

  return (
    <Svg style={[styles.icon, style]} viewBox="0 0 26 26" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.2913 4.333H2.708C2.27251 4.31771 1.85024 4.48399 1.54212 4.79212C1.23399 5.10024 1.06771 5.52251 1.083 5.958V20.0413C1.083 20.9388 1.81054 21.6663 2.708 21.6663H23.2913C24.1888 21.6663 24.9163 20.9388 24.9163 20.0413V5.958C24.9316 5.52251 24.7653 5.10024 24.4572 4.79212C24.1491 4.48399 23.7268 4.31771 23.2913 4.333ZM8.558 9.74967C8.26249 9.76123 7.98623 9.89936 7.79967 10.1288C7.60699 10.354 7.50981 10.6456 7.52883 10.9413C7.81725 10.9506 8.09494 10.8315 8.28717 10.6163C8.45796 10.359 8.55191 10.0584 8.558 9.74967ZM8.50383 14.9497C8.34759 14.9497 8.22891 14.9121 8.10565 14.8731C7.97252 14.831 7.83405 14.7872 7.63717 14.7872C7.41344 14.7872 7.26515 14.8437 7.11439 14.9013L7.11438 14.9013C7.00965 14.9412 6.90373 14.9816 6.7705 15.0038C6.46011 15.0556 6.19912 14.6626 5.98755 14.3441L5.958 14.2997C5.74133 13.9747 5.19967 12.5122 5.633 11.6997C5.8401 11.2937 6.26063 11.0413 6.71633 11.0497C6.89525 11.0497 7.07417 11.1153 7.23501 11.1744C7.36633 11.2226 7.48561 11.2663 7.583 11.2663C7.67275 11.2663 7.77179 11.2199 7.88782 11.1654C8.05191 11.0884 8.24999 10.9955 8.50383 10.9955H8.558C8.93322 11.0206 9.27455 11.2214 9.47883 11.5372C9.14794 11.7524 8.9451 12.1175 8.93717 12.5122C8.93876 12.9802 9.21422 13.404 9.64133 13.5955C9.55472 13.8663 9.42682 14.1221 9.26217 14.3538C9.0455 14.6788 8.82883 14.9497 8.50383 14.9497ZM11.2122 14.9497V13.2705H12.2413C12.6625 13.2858 13.071 13.1253 13.3689 12.8273C13.6669 12.5293 13.8275 12.1208 13.8122 11.6997C13.8275 11.2785 13.6669 10.87 13.3689 10.5721C13.071 10.2741 12.6625 10.1135 12.2413 10.1288H10.4538V14.9497H11.2122ZM16.9538 14.9497H16.3038V14.3538H16.2497C16.0426 14.7598 15.622 15.0122 15.1663 15.0038C14.8618 15.0146 14.5669 14.8966 14.3538 14.6788C14.132 14.4914 14.0115 14.2104 14.0288 13.9205C14.0288 13.3247 14.5163 12.9455 15.3288 12.8913H16.2497V12.6205C16.2504 12.4526 16.1802 12.2922 16.0565 12.1788C15.9327 12.0654 15.7668 12.0094 15.5997 12.0247C15.1663 12.0247 14.8955 12.1872 14.8413 12.5122H14.1372C14.1913 11.8622 14.733 11.4288 15.5997 11.4288C16.4663 11.4288 16.9538 11.8622 16.9538 12.5663V14.9497ZM17.9288 16.2497C18.633 16.2497 18.958 15.9788 19.283 15.1122L20.583 11.4288H19.8247L18.958 14.2997L17.983 11.4288H17.2247L18.4705 14.9497V15.1663C18.3622 15.5455 18.1997 15.6538 17.8747 15.6538H17.6038V16.2497H17.9288ZM15.4372 13.3247H16.2497V13.5955C16.2502 13.8207 16.1572 14.036 15.9929 14.1901C15.8286 14.3441 15.6077 14.423 15.383 14.408C15.0038 14.408 14.733 14.2455 14.733 13.9205C14.733 13.9002 14.7341 13.8805 14.7361 13.8614C14.7369 13.8547 14.7377 13.8481 14.7387 13.8416L14.7406 13.8304C14.7871 13.5645 15.0459 13.4225 15.4372 13.3247ZM12.0788 12.6747H11.2122V10.7247H12.0788C12.3469 10.6884 12.6165 10.7794 12.8078 10.9707C12.9991 11.162 13.0901 11.4316 13.0538 11.6997C13.0901 11.9677 12.9991 12.2374 12.8078 12.4286C12.6165 12.6199 12.3469 12.7109 12.0788 12.6747Z"
        fill={svgColor}
      />
      <Path d="M4.38724 14.301L4.22474 14.0844C4.22474 14.1927 4.27891 14.301 4.38724 14.301Z" fill="black" />
      <Path d="M21.3953 10.3461L21.5578 10.5628C21.6119 10.4544 21.5036 10.3461 21.3953 10.3461Z" fill="black" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export default ApplePayIcon;
