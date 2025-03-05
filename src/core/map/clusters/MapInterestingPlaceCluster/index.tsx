import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Marker } from 'react-native-maps';
import Animated from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import SuperCluster from 'supercluster';

import { useTheme } from '../../../themes/v2/themeContext';
import { type MapInterestingPlace } from '../../markers/MapInterestingPlaceMarker/types';
import { type MapInterestingPlaceClusterType } from '../types';

const clusterMarkerSize = 150;

const MapInterestingPlaceCluster = ({
  cluster,
  getClusterItems,
}: {
  cluster: MapInterestingPlaceClusterType;
  getClusterItems: (clusterId: number) => SuperCluster.PointFeature<MapInterestingPlace>[];
}) => {
  const { colors } = useTheme();

  const [clusterItem, setClusterItem] = useState<MapInterestingPlace | null>(null);

  const { geometry, properties } = cluster;
  const pointsCount = properties.point_count;

  useEffect(() => {
    const clusterItems = getClusterItems(properties.cluster_id);
    if (clusterItems.length > 0 && clusterItems[0]) {
      setClusterItem(clusterItems[0].properties);
    }
  }, [getClusterItems, properties.cluster_id]);

  const computedStyles = StyleSheet.create({
    contentAndGradientContainer: {
      width: clusterMarkerSize,
      height: clusterMarkerSize,
    },
    placeContainer: {
      width: clusterMarkerSize,
      height: clusterMarkerSize,
    },
    placeImage: {
      borderColor: colors.backgroundPrimaryColor,
    },
    placeTitleContainer: {
      backgroundColor: colors.backgroundSecondaryColor,
    },
    placeTitle: {
      backgroundColor: colors.backgroundSecondaryColor,
      color: colors.textSecondaryColor,
    },
  });

  if (geometry.coordinates[0] === undefined || geometry.coordinates[1] === undefined) {
    return;
  }

  return (
    <Marker
      anchor={{ x: 0.5, y: 0.5 }} // centers icon
      coordinate={{
        longitude: geometry.coordinates[0],
        latitude: geometry.coordinates[1],
      }}
      onPress={cluster.onPress}
    >
      {clusterItem && (
        <View style={[styles.contentAndGradientContainer, computedStyles.contentAndGradientContainer]}>
          <Svg style={StyleSheet.absoluteFill} width={clusterMarkerSize} height={clusterMarkerSize}>
            <Defs>
              <RadialGradient id="gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <Stop offset="0%" stopColor={clusterItem.backgroundGradientColor} />
                <Stop offset="100%" stopColor="white" stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#gradient)" />
          </Svg>

          <Animated.View style={[styles.placeContainer, computedStyles.placeContainer]}>
            <View style={styles.placeTitleFlexWrapper}>
              <Animated.View style={[styles.placeTitleContainer, computedStyles.placeTitleContainer]}>
                <Text style={[styles.placeTitle, computedStyles.placeTitle]} numberOfLines={1}>
                  {`${pointsCount}+`}
                </Text>
              </Animated.View>
            </View>
            <Animated.View style={styles.placeImagesContainer}>
              <Animated.Image
                style={[styles.placeImage, styles.placeImageFirst, computedStyles.placeImage]}
                source={{ uri: clusterItem.imageFirst.uri }}
              />
              <Animated.Image
                style={[styles.placeImage, styles.placeImageSecond, computedStyles.placeImage]}
                source={{ uri: clusterItem.imageSecond.uri }}
              />
            </Animated.View>
          </Animated.View>
        </View>
      )}
    </Marker>
  );
};

const styles = StyleSheet.create({
  contentAndGradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeImagesContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeImage: {
    height: '50%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 3,
  },
  placeImageFirst: {
    bottom: '-30%',
    left: '-10%',
    transform: [{ rotate: '-20deg' }],
  },
  placeImageSecond: {
    top: '-30%',
    right: '-10%',
    transform: [{ rotate: '20deg' }],
  },
  placeTitleFlexWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  placeTitleContainer: {
    bottom: '-20%',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  placeTitle: {
    fontFamily: 'Inter SemiBold',
    lineHeight: 16,
  },
});

export default MapInterestingPlaceCluster;
