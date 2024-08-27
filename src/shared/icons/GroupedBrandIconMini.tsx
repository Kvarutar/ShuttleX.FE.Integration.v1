import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useThemeV1 } from '../../core/themes/v1/themeContext';

const GroupedBrandIconMini = ({
  style,
  favIconColor,
  textIconColor,
}: {
  style?: StyleProp<ViewStyle>;
  favIconColor?: string;
  textIconColor?: string;
}): JSX.Element => {
  const { colors } = useThemeV1();
  const svgColor = {
    facIconColor: favIconColor ?? colors.iconPrimaryColor,
    textIconColor: textIconColor ?? colors.iconPrimaryColor,
  };

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 259 75" style={[styles.icon, style]}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M114.999 49.817V36.9383C114.999 35.4681 115.459 34.2625 116.38 33.3217C117.3 32.3807 118.476 31.9102 119.908 31.9102C121.339 31.9102 122.479 32.3733 123.326 33.2996C124.173 34.2258 124.596 35.4388 124.596 36.9383V49.817H129.198V36.2766C129.198 33.6893 128.475 31.6089 127.029 30.0358C125.583 28.4627 123.647 27.6761 121.222 27.6761C118.564 27.6761 116.489 28.5582 114.999 30.3225V16.7383H110.398V49.817H114.999ZM95.3673 50.3021C97.6459 50.3021 99.545 49.7288 101.064 48.5821C102.583 47.4058 103.343 45.7741 103.343 43.6863C103.343 42.1868 102.883 40.9445 101.962 39.9597C101.042 38.9745 99.545 38.0409 97.4707 37.159L95.4109 36.321C94.3299 35.8798 93.585 35.4755 93.1762 35.108C92.7671 34.7404 92.5626 34.2921 92.5626 33.7627C92.5626 32.381 93.5414 31.69 95.4986 31.69C97.456 31.69 99.1359 32.4251 100.538 33.8952L103.036 31.0283C101.166 28.7937 98.6828 27.6763 95.5861 27.6763C93.3658 27.6763 91.5473 28.2424 90.1302 29.3744C88.7134 30.5063 88.005 32.028 88.005 33.9393C88.005 35.4095 88.4505 36.6222 89.3417 37.5778C90.2328 38.5336 91.6567 39.4229 93.6142 40.2462L95.8053 41.1724C96.9446 41.6429 97.7333 42.0619 98.1715 42.4295C98.6098 42.797 98.8293 43.2747 98.8293 43.8629C98.8293 44.6273 98.5079 45.2227 97.8651 45.6492C97.2224 46.0753 96.3898 46.2887 95.3673 46.2887C93.293 46.2887 91.2768 45.2595 89.3194 43.2013L86.6901 46.1123C88.8231 48.9056 91.7153 50.3021 95.3673 50.3021ZM153.234 47.6559C151.467 49.4202 149.239 50.3021 146.551 50.3021C143.805 50.3021 141.548 49.4273 139.781 47.678C138.013 45.9285 137.13 43.6129 137.13 40.7315V28.1614H141.687V41.0842C141.687 42.5544 142.14 43.7452 143.046 44.6567C143.951 45.5681 145.12 46.0241 146.551 46.0241C147.924 46.0241 149.056 45.5681 149.948 44.6567C150.838 43.7452 151.284 42.5544 151.284 41.0842V28.1614H155.886V40.7315C155.886 43.5836 155.002 45.8916 153.234 47.6559ZM173.064 50.3021C174.086 50.3021 175.357 50.1405 176.877 49.817V45.8916C175.474 46.0386 174.524 46.112 174.028 46.112C172.567 46.112 171.494 45.8255 170.807 45.2521C170.12 44.6788 169.777 43.7159 169.777 42.3632V32.175H176.175V28.1614H169.777V22.4719H165.132V28.1614H161.626V32.175H165.132V42.7601C165.132 45.2595 165.826 47.1413 167.213 48.4055C168.601 49.67 170.551 50.3021 173.064 50.3021ZM194.755 49.817C193.236 50.1405 191.965 50.3021 190.943 50.3021C188.431 50.3021 186.481 49.67 185.093 48.4055C183.705 47.1413 183.011 45.2595 183.011 42.7601V32.175H179.505V28.1614H183.011V22.4719H187.657V28.1614H194.055V32.175H187.657V42.3632C187.657 43.7159 188 44.6788 188.686 45.2521C189.373 45.8255 190.447 46.112 191.907 46.112C192.404 46.112 193.353 46.0386 194.755 45.8916V49.817ZM205.755 49.817V16.7383H201.154V49.817H205.755ZM232.969 46.8178C230.544 49.1406 227.681 50.3021 224.38 50.3021C221.108 50.3021 218.361 49.2214 216.141 47.0602C213.92 44.8991 212.811 42.2162 212.811 39.0112C212.752 35.8943 213.833 33.2114 216.053 30.962C218.274 28.7127 220.903 27.6175 223.941 27.6761C226.775 27.6761 229.142 28.6245 231.041 30.5208C232.94 32.4174 233.889 34.7771 233.889 37.5997C233.889 38.4525 233.772 39.4229 233.538 40.5107H217.499C217.792 42.275 218.573 43.6641 219.844 44.6786C221.115 45.693 222.67 46.2002 224.511 46.2002C226.79 46.2002 228.879 45.3476 230.778 43.6422L232.969 46.8178ZM229.288 36.8937H217.588C217.938 35.2767 218.676 33.9903 219.801 33.0345C220.925 32.079 222.248 31.6013 223.767 31.6013C225.315 31.6013 226.615 32.079 227.667 33.0345C228.718 33.9903 229.259 35.2767 229.288 36.8937ZM248.35 41.8779L237.4 64.1819H232.142L245.721 38.5701L238.316 28.1611H243.573L248.394 35.3063L253.741 22.1393H259L250.98 38.6141L259 49.8168H253.741L248.35 41.8779Z"
        fill={svgColor.facIconColor}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M57.4726 2.43614C54.7514 1.38724 51.7965 0.8125 48.7084 0.8125H24.6622C11.1337 0.8125 0.166748 11.8416 0.166748 25.4466V49.6866C0.166748 54.9804 1.82714 59.8841 4.65274 63.8997L20.7608 46.2957V46.2954C22.5598 44.3294 22.4728 41.2802 20.5654 39.4213H20.5651L12.7262 31.7817C9.8117 28.9414 9.7386 24.2627 12.563 21.3317C15.3874 18.4007 20.0397 18.3271 22.9541 21.1674L30.7932 28.8069L30.7934 28.8072C38.4237 36.2435 38.7708 48.4403 31.576 56.3038L16.4036 72.8855C18.9837 73.8147 21.7642 74.3207 24.6622 74.3207H48.7084C62.2367 74.3207 73.2038 63.2918 73.2038 49.6866V25.4466C73.2038 20.3375 71.6572 15.5914 69.009 11.6564L53.4083 28.7062L53.4081 28.7064C51.6096 30.6722 51.6966 33.7214 53.604 35.5806L61.4428 43.2199C64.3573 46.0602 64.4305 50.7389 61.6059 53.6699C58.7816 56.6011 54.1292 56.6745 51.2148 53.8342L43.376 46.1949C35.7457 38.7584 35.3983 26.5613 42.5929 18.698H42.5931L57.4726 2.43614Z"
        fill={svgColor.textIconColor}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 106,
    height: 35,
  },
});

export default GroupedBrandIconMini;
