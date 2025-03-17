import { StyleSheet } from 'react-native';

import BottomWindowWithGesture from '../BottomWindowWithGesture';
import PhoneSelect from './PhoneSelect';
import { type SlidingPanelProps } from './props';

const SlidingPanel = ({
  flagState,
  onFlagSelect,
  isPanelOpen,
  setIsPanelOpen,
  withShade = true,
  bottomWindowStyle,
}: SlidingPanelProps): JSX.Element => {
  return (
    <BottomWindowWithGesture
      hiddenPartStyle={styles.hiddenPart}
      hiddenPartWrapperStyle={styles.hiddenPartWrapper}
      bottomWindowStyle={bottomWindowStyle}
      setIsOpened={setIsPanelOpen}
      opened={isPanelOpen}
      maxHeight={0.85}
      withHiddenPartScroll={false}
      withShade={withShade}
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
  hiddenPartWrapper: {
    paddingBottom: 0,
  },
});

export default SlidingPanel;
