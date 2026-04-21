import { Pressable, ViewStyle, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
  style?: ViewStyle;
  children: React.ReactNode;
};

export default function WebPressable({ onPress, style, children }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        style,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      onClick={onPress}
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
});