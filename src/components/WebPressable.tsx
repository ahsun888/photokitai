import React from 'react';
import { Pressable, ViewStyle, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function WebPressable({ onPress, style, children, disabled }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      onClick={onPress}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    cursor: 'pointer',
    userSelect: 'none',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});