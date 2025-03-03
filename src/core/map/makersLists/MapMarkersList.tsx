import { Marker } from 'react-native-maps';

import MapPinIcon from '../../../shared/icons/MapPinIcon';
import MapPinIcon2 from '../../../shared/icons/MapPinIcon2';
import { mapConstants } from '../MapView';
import { type MapMarker } from '../types';

//We don't use "cluster={false}" prop here, because this markers are in child component from MapView and clustering doesn't work here
const MapMarkersList = ({ markers }: { markers: MapMarker[] }) => {
  return markers.map((marker, i) => {
    switch (marker.type) {
      case 'simple':
        return (
          <Marker
            key={`${i} ${marker.coordinates}`}
            coordinate={marker.coordinates}
            anchor={{ x: 0.5, y: 0.98 }}
            tracksViewChanges={true}
            zIndex={marker.zIndex ?? mapConstants.zIndexes.marker}
          >
            <MapPinIcon colorMode={marker.colorMode} />
          </Marker>
        );
      case 'withLabel':
        return (
          <Marker
            key={`${i} ${marker.coordinates}`}
            coordinate={marker.coordinates}
            anchor={{ x: 0.5, y: 0.98 }}
            tracksViewChanges={true}
            zIndex={marker.zIndex ?? mapConstants.zIndexes.marker}
          >
            <MapPinIcon2 colorMode={marker.colorMode} title={marker.title} subtitle={marker.subtitle} />
          </Marker>
        );
    }
  });
};

export default MapMarkersList;
