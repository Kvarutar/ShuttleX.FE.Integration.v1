import type Supercluster from 'supercluster';

import { type MapInterestingPlace } from '../markers/MapInterestingPlaceMarker/types';

export type MapInterestingPlaceClusterType = Supercluster.ClusterFeature<MapInterestingPlace> & { onPress: () => void };
