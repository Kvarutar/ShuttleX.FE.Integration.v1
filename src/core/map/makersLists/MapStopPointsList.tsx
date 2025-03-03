import { StyleSheet, View } from 'react-native';
import { type LatLng, Marker } from 'react-native-maps';

import Text from '../../../shared/atoms/Text';
import PickUpIcon from '../../../shared/icons/PickUpIcon';
import { mapConstants } from '../MapView';

//We don't use "cluster={false}" prop here, because this markers are in child component from MapView and clustering doesn't work here
const MapStopPointsList = ({ stopPoints }: { stopPoints: LatLng[] }) => {
  return stopPoints.map((elem, i) => (
    <Marker
      key={`${i} ${elem.latitude} ${elem.longitude}`}
      coordinate={elem}
      anchor={{ x: 0.5, y: 0.5 }}
      tracksViewChanges={false}
      zIndex={mapConstants.zIndexes.marker}
    >
      <View style={styles.stopPointContainer}>
        <PickUpIcon style={styles.stopPointIcon} />
        <View style={styles.stopPointLabelContainer}>
          <Text style={styles.stopPointLabel}>{i + 1}</Text>
        </View>
      </View>
    </Marker>
  ));
};

const styles = StyleSheet.create({
  stopPointContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopPointIcon: {
    width: 32,
    height: 32,
  },
  stopPointLabelContainer: {
    position: 'absolute',
    left: 90,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopPointLabel: {
    fontSize: 18,
  },
});

export default MapStopPointsList;
