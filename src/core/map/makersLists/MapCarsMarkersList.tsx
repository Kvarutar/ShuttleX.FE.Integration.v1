import { StyleSheet } from 'react-native';

import { constants as topViewCarImageConstants } from '../../../shared/images/TopViewCarImage';
import { constants as dotsConstants } from '../../../shared/molecules/LoadingAnimation3dots';
import { mapConstants } from '../MapView';
import MapCarMarker, { constants as carMarkerConstants, thinkingAnimationConsts } from '../markers/MapCarMarker';
import { type MapCars } from '../types';
import { scaleNumberByZoomLevel } from '../utils';

//We don't use "cluster={false}" prop here, because this markers are in child component from MapView and clustering doesn't work here
const MapCarsMarkersList = ({
  cars,
  zoomLevel,
  withCarsThinkingAnimation,
}: {
  cars: MapCars;
  zoomLevel: number;
  withCarsThinkingAnimation: boolean;
}) => {
  const computedStyles = StyleSheet.create({
    carImage: {
      height: scaleNumberByZoomLevel(zoomLevel, topViewCarImageConstants.height),
    },
    carImageContainer: {
      height: scaleNumberByZoomLevel(zoomLevel, carMarkerConstants.carImageContainer.height),
    },
    thinkingDotContainer: {
      paddingLeft: scaleNumberByZoomLevel(
        zoomLevel,
        thinkingAnimationConsts.shadowDistance + thinkingAnimationConsts.paddingLeft,
      ),
      paddingRight: scaleNumberByZoomLevel(zoomLevel, thinkingAnimationConsts.shadowDistance),
      paddingTop: scaleNumberByZoomLevel(zoomLevel, thinkingAnimationConsts.shadowDistance),
      paddingBottom: scaleNumberByZoomLevel(
        zoomLevel,
        thinkingAnimationConsts.shadowDistance + thinkingAnimationConsts.paddingBottom,
      ),
    },
    thinkingDot: {
      height: scaleNumberByZoomLevel(zoomLevel, dotsConstants.height),
    },
  });

  return cars.data.map(carData => (
    <MapCarMarker
      key={carData.id}
      coordinate={carData.coordinates}
      heading={carData.heading}
      animationDuration={cars.animationDuration}
      zIndex={mapConstants.zIndexes.car}
      thinkingAnimationZIndex={mapConstants.zIndexes.carThinkingAnimation}
      withThinkingAnimation={withCarsThinkingAnimation}
      carStyles={{
        carImageHeight: computedStyles.carImage.height,
        carImageContainerWidthAndHeight: computedStyles.carImageContainer.height,
      }}
      loadingAnimation3DotsStyles={{
        thinkingDotWidthAndHeight: computedStyles.thinkingDot.height,
        thinkingDotContainer: computedStyles.thinkingDotContainer,
      }}
    />
  ));
};

export default MapCarsMarkersList;
