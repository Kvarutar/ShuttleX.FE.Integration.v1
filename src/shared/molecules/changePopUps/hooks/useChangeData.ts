import { useCallback, useState } from 'react';

import { type ChangeDataPopUpMode } from '../types';

export const useChangeData = () => {
  const [modalState, setModalState] = useState({
    isVisible: false,
    mode: 'email' as ChangeDataPopUpMode,
    changedValue: '',
  });

  const handleOpenChangeWindow = useCallback((selectedMode: ChangeDataPopUpMode) => {
    setModalState(prev => ({
      ...prev,
      isVisible: true,
      mode: selectedMode,
    }));
  }, []);

  const onChangeDataPopupClose = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const handleValueChange = useCallback((newValue: string) => {
    setModalState(prev => ({
      ...prev,
      changedValue: newValue,
    }));
  }, []);

  return {
    isChangeDataPopUpVisible: modalState.isVisible,
    mode: modalState.mode,
    changedValue: modalState.changedValue,
    handleOpenChangeWindow,
    onChangeDataPopupClose,
    handleValueChange,
  };
};
