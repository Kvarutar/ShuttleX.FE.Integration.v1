import React from 'react';
import { Modal as ModalBase, StyleSheet, View } from 'react-native';

import { useTheme } from '../../../core/themes/themeContext';
import Blur from '../Blur';
import { type ModalProps } from './props';

const Modal = ({ children, style, containerStyle }: ModalProps) => {
  const { colors } = useTheme();

  const computedStyles = StyleSheet.create({
    modal: {
      borderColor: colors.borderColor,
      backgroundColor: colors.backgroundPrimaryColor,
    },
  });

  return (
    <ModalBase transparent>
      <Blur />
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.modal, computedStyles.modal, style]}>{children}</View>
      </View>
    </ModalBase>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
});

export default Modal;
