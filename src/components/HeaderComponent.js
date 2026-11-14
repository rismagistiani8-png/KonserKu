import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SERIF } from '../theme';

// Props: title, subtitle, onBack (jika ada, tombol kembali muncul)
export default function HeaderComponent({ title, subtitle, onBack }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.back}>
          <Text style={styles.backText}>← Kembali</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bg,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  back: { marginBottom: 6 },
  backText: { color: COLORS.maroon, fontWeight: '600' },
  title: {
    fontFamily: FONT_SERIF,
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.maroon,
  },
  subtitle: { marginTop: 4, color: COLORS.text, fontSize: 13 },
});