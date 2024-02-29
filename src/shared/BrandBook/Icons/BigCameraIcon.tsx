import React from 'react';
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native';
import Svg, { G, Mask, Path } from 'react-native-svg';

import { useTheme } from '../../../core/themes/themeContext';

const BigCameraIcon = ({ style, color }: { style?: StyleProp<ViewStyle>; color?: string }): JSX.Element => {
  const { colors } = useTheme();
  const svgColor = color ?? colors.iconPrimaryColor;

  return (
    <Svg style={[styles.icon, style]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254 250" fill="none">
      <G opacity={0.05}>
        <Mask id="path-1-inside-1_115_2042" fill={colors.backgroundPrimaryColor}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M102.904 75C99.8322 75 96.931 76.4117 95.0353 78.8286L88.9532 86.5833C88.3814 87.3123 87.9247 88.101 87.583 88.9252H69.9961C58.9504 88.9252 49.9961 97.8795 49.9961 108.925V155.262C49.9961 166.307 58.9504 175.262 69.9961 175.262H178.996C190.042 175.262 198.996 166.307 198.996 155.262V108.925C198.996 97.8795 190.042 88.9252 178.996 88.9252H161.409C161.068 88.101 160.611 87.3123 160.039 86.5833L153.957 78.8286C152.061 76.4117 149.16 75 146.088 75H102.904ZM153.043 130.005C153.043 145.771 140.262 158.551 124.496 158.551C108.73 158.551 95.9494 145.771 95.9494 130.005C95.9494 114.239 108.73 101.458 124.496 101.458C140.262 101.458 153.043 114.239 153.043 130.005ZM171.494 99.3692C168.994 99.3692 166.968 101.395 166.968 103.895C166.968 106.394 168.994 108.421 171.494 108.421H184.026C186.526 108.421 188.552 106.394 188.552 103.895C188.552 101.395 186.526 99.3692 184.026 99.3692H171.494Z"
          />
        </Mask>
        <Path
          d="M95.0353 78.8286L96.609 80.0629V80.0629L95.0353 78.8286ZM88.9532 86.5833L87.3795 85.349L88.9532 86.5833ZM87.583 88.9252V90.9252H88.9189L89.4305 89.6911L87.583 88.9252ZM161.409 88.9252L159.562 89.6911L160.073 90.9252H161.409V88.9252ZM160.039 86.5833L161.613 85.349V85.349L160.039 86.5833ZM153.957 78.8286L152.383 80.0629V80.0629L153.957 78.8286ZM96.609 80.0629C98.1255 78.1293 100.447 77 102.904 77V73C99.2179 73 95.7364 74.694 93.4616 77.5943L96.609 80.0629ZM90.5269 87.8176L96.609 80.0629L93.4616 77.5943L87.3795 85.349L90.5269 87.8176ZM89.4305 89.6911C89.7034 89.0328 90.0685 88.402 90.5269 87.8176L87.3795 85.349C86.6943 86.2226 86.1459 87.1692 85.7354 88.1593L89.4305 89.6911ZM69.9961 90.9252H87.583V86.9252H69.9961V90.9252ZM51.9961 108.925C51.9961 98.9841 60.055 90.9252 69.9961 90.9252V86.9252C57.8458 86.9252 47.9961 96.775 47.9961 108.925H51.9961ZM51.9961 155.262V108.925H47.9961V155.262H51.9961ZM69.9961 173.262C60.055 173.262 51.9961 165.203 51.9961 155.262H47.9961C47.9961 167.412 57.8458 177.262 69.9961 177.262V173.262ZM178.996 173.262H69.9961V177.262H178.996V173.262ZM196.996 155.262C196.996 165.203 188.937 173.262 178.996 173.262V177.262C191.146 177.262 200.996 167.412 200.996 155.262H196.996ZM196.996 108.925V155.262H200.996V108.925H196.996ZM178.996 90.9252C188.937 90.9252 196.996 98.9841 196.996 108.925H200.996C200.996 96.775 191.146 86.9252 178.996 86.9252V90.9252ZM161.409 90.9252H178.996V86.9252H161.409V90.9252ZM158.465 87.8176C158.924 88.402 159.289 89.0328 159.562 89.6911L163.257 88.1593C162.846 87.1692 162.298 86.2226 161.613 85.349L158.465 87.8176ZM152.383 80.0629L158.465 87.8176L161.613 85.349L155.531 77.5943L152.383 80.0629ZM146.088 77C148.546 77 150.867 78.1293 152.383 80.0629L155.531 77.5943C153.256 74.694 149.774 73 146.088 73V77ZM102.904 77H146.088V73H102.904V77ZM124.496 160.551C141.367 160.551 155.043 146.875 155.043 130.005H151.043C151.043 144.666 139.157 156.551 124.496 156.551V160.551ZM93.9494 130.005C93.9494 146.875 107.626 160.551 124.496 160.551V156.551C109.835 156.551 97.9494 144.666 97.9494 130.005H93.9494ZM124.496 99.458C107.626 99.458 93.9494 113.134 93.9494 130.005H97.9494C97.9494 115.343 109.835 103.458 124.496 103.458V99.458ZM155.043 130.005C155.043 113.134 141.367 99.458 124.496 99.458V103.458C139.157 103.458 151.043 115.343 151.043 130.005H155.043ZM168.968 103.895C168.968 102.5 170.099 101.369 171.494 101.369V97.3692C167.89 97.3692 164.968 100.291 164.968 103.895H168.968ZM171.494 106.421C170.099 106.421 168.968 105.29 168.968 103.895H164.968C164.968 107.499 167.89 110.421 171.494 110.421V106.421ZM184.026 106.421H171.494V110.421H184.026V106.421ZM186.552 103.895C186.552 105.29 185.421 106.421 184.026 106.421V110.421C187.631 110.421 190.552 107.499 190.552 103.895H186.552ZM184.026 101.369C185.421 101.369 186.552 102.5 186.552 103.895H190.552C190.552 100.291 187.631 97.3692 184.026 97.3692V101.369ZM171.494 101.369H184.026V97.3692H171.494V101.369Z"
          fill={svgColor}
          mask="url(#path-1-inside-1_115_2042)"
        />
      </G>
    </Svg>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 254,
    height: 250,
  },
});

export default BigCameraIcon;
