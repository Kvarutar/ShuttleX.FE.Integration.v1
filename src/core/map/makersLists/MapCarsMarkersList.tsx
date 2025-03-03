import { StyleSheet } from 'react-native';

import { constants as topViewCarImageConstants } from '../../../shared/images/TopViewCarImage';
import { mapConstants } from '../MapView';
import MapCarMarker, { constants as carMarkerConstants } from '../markers/MapCarMarker';
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
      width: scaleNumberByZoomLevel(zoomLevel, carMarkerConstants.carImageContainer.width),
      height: scaleNumberByZoomLevel(zoomLevel, carMarkerConstants.carImageContainer.height),
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
    />
  ));
};

export default MapCarsMarkersList;
