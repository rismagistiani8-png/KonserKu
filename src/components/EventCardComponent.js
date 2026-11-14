import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONT_SERIF } from '../utils/theme';
import { formatRupiah } from '../utils/format';

// SAKLAR TES:
// true  = semua kartu memakai foto acak dari internet (untuk tes)
// false = memakai foto asli dari concerts.js
const USE_TEST_IMAGE = true;

export default function EventCardComponent({ event, onPress }) {
  const minPrice = Math.min(...event.tickets.map((t) => t.price));

  const imageSource = USE_TEST_IMAGE
    ? { uri: 'https://picsum.photos/300/400' }
    : event.image;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
      <View style={styles.poster}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText} numberOfLines={1}>
            {event.date}
          </Text>
        </View>
      </View>

      <View style={styles.info}>
        {event.trending && <Text style={styles.badge}>🔥 TRENDING</Text>}
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        <Text style={styles.meta}>{event.artist}</Text>
        <Text style={styles.meta} numberOfLines={1}>
          📍 {event.location}
        </Text>
        <Text style={styles.price}>Mulai {formatRupiah(minPrice)}</Text>
        {/* Info debug: tampil "string" atau "number" */}
        <Text style={styles.debug}>tipe image: {typeof event.image}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 10,
    marginBottom: 14,
    elevation: 3,
  },
  poster: {
    width: 120,
    height: 150,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.gold,
    backgroundColor: COLORS.pink,
    overflow: 'hidden',
  },
  image: { width: 114, height: 144 },
  ribbon: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(92, 26, 20, 0.85)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  ribbonText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.blue,
    color: COLORS.maroon,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  title: {
    fontFamily: FONT_SERIF,
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.maroon,
  },
  meta: { fontSize: 12, color: COLORS.text, marginTop: 2 },
  price: { marginTop: 6, fontWeight: '800', color: COLORS.maroon },
  debug: { marginTop: 4, fontSize: 10, color: 'red' },
});