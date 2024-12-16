import { useCallback, useState } from 'react';

import { type ChangeDataPopUpMode } from '../types';

export const useChangeData = () => {
  const [modalState, setModalState] = useState({
    isChangeVisible: false,
    isVerifyVisible: false,
    mode: 'email' as ChangeDataPopUpMode,
    changedValue: '',
  });

  const handleOpenChangeWindow = useCallback((selectedMode: ChangeDataPopUpMode) => {
    setModalState(prev => ({
      ...prev,
      isChangeVisible: true,
      mode: selectedMode,
    }));
  }, []);

  const handleOpenVerifyWindow = useCallback((selectedMode: ChangeDataPopUpMode) => {
    setModalState(prev => ({
      ...prev,
      isVerifyVisible: true,
      mode: selectedMode,
    }));
  }, []);

  const onChangeDataPopupClose = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isChangeVisible: false,
    }));
  }, []);

  const onVerifyPopupClose = useCallback(() => {
    setModalState(prev => ({
      ...prev,
      isVerifyVisible: false,
    }));
  }, []);

  const handleValueChange = useCallback((newValue: string) => {
    setModalState(prev => ({
      ...prev,
      changedValue: newValue,
    }));
  }, []);

  return {
    isChangeDataPopUpVisible: modalState.isChangeVisible,
    isVerifyPopUpVisible: modalState.isVerifyVisible,
    mode: modalState.mode,
    changedValue: modalState.changedValue,
    handleOpenChangeWindow,
    handleOpenVerifyWindow,
    onChangeDataPopupClose,
    onVerifyPopupClose,
    handleValueChange,
  };
};
