import { StyleSheet } from 'react-native';

import BottomWindowWithGesture from '../BottomWindowWithGesture';
import PhoneSelect from './PhoneSelect';
import { type SlidingPanelProps } from './props';

const SlidingPanel = ({ flagState, onFlagSelect, isPanelOpen, setIsPanelOpen }: SlidingPanelProps): JSX.Element => {
  return (
    <BottomWindowWithGesture
      hiddenPartStyle={styles.hiddenPart}
      visiblePartStyle={styles.visiblePart}
      setIsOpened={setIsPanelOpen}
      opened={isPanelOpen}
      maxHeight={0.85}
      hiddenPart={
        <PhoneSelect onFlagSelect={onFlagSelect} flagState={flagState} hidePanel={() => setIsPanelOpen(false)} />
      }
    />
  );
};

const styles = StyleSheet.create({
  hiddenPart: {
    height: '100%',
  },
  visiblePart: {
    marginTop: 4,
    marginBottom: 4,
  },
});

export default SlidingPanel;
