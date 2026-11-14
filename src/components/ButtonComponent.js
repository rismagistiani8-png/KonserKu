import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';

// Props: title, onPress, variant ('primary' | 'outline'), disabled
export default function ButtonComponent({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
}) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        isPrimary ? styles.primary : styles.outline,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, !isPrimary && { color: COLORS.maroon }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  primary: { backgroundColor: COLORS.maroon },
  outline: { borderWidth: 2, borderColor: COLORS.maroon },
  disabled: { opacity: 0.4 },
  text: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
});