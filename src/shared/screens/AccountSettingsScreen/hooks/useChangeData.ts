import { useCallback, useState } from 'react';

import { type ChangeDataPopUpMode } from '../props';

export const useChangeData = () => {
  const [isChangeDataPopUpVisible, setIsChangeDataPopUpVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<ChangeDataPopUpMode>('email');
  const [changedValue, setChangedValue] = useState<string>('');

  const handleOpenChangeWindow = useCallback((selectedMode: ChangeDataPopUpMode) => {
    setMode(selectedMode);
    setIsChangeDataPopUpVisible(true);
  }, []);

  const handleChangeDataClose = useCallback(() => {
    setIsChangeDataPopUpVisible(false);
  }, []);

  const handleValueChange = useCallback((newValue: string) => {
    setChangedValue(newValue);
  }, []);

  return {
    isChangeDataPopUpVisible,
    mode,
    changedValue,
    handleOpenChangeWindow,
    handleChangeDataClose,
    handleValueChange,
  };
};
