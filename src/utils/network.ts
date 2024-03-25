import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useRef } from 'react';

type useNetworkConnectionStartWatchArgs = {
  onConnect: () => void;
  onDisconnect: () => void;
};

const useNetworkConnectionStartWatch = ({ onConnect, onDisconnect }: useNetworkConnectionStartWatchArgs) => {
  // Black magic, dont touch (prevents useEffects react to callbacks changes)
  const onConnectRef = useRef<useNetworkConnectionStartWatchArgs['onConnect']>();
  const onDisconnectRef = useRef<useNetworkConnectionStartWatchArgs['onDisconnect']>();
  useEffect(() => {
    onConnectRef.current = onConnect;
  }, [onConnect]);
  useEffect(() => {
    onDisconnectRef.current = onDisconnect;
  }, [onDisconnect]);

  const { isConnected } = useNetInfo();

  useEffect(() => {
    if (isConnected !== null) {
      if (isConnected) {
        onConnectRef.current?.();
      } else {
        onDisconnectRef.current?.();
      }
    }
  }, [isConnected]);
};

export { useNetworkConnectionStartWatch };
