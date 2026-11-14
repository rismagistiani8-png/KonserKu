import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import { COLORS, FONT_SERIF } from '../theme';
import { formatRupiah } from '../utils/format';

export default function DetailScreen({ route, navigation }) {
  const { event } = route.params; // data dari Home

  return (
    <View style={styles.container}>
      <HeaderComponent title="Detail Konser" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Poster konser */}
        <View style={styles.frame}>
          <Image source={event.image} style={styles.image} resizeMode="cover" />
        </View>

        <Text style={styles.label}>A LITTLE ABOUT THE SHOW</Text>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.text}>📅 {event.date} • {event.time}</Text>
        <Text style={styles.text}>📍 {event.location}</Text>

        {/* Guest Star hanya tampil kalau ada datanya */}
        {event.guestStars.length > 0 && (
          <View>
            <Text style={styles.section}>Guest Star</Text>
            <View style={styles.starRow}>
              {event.guestStars.map((s) => (
                <View key={s} style={styles.starChip}>
                  <Text style={styles.starText}>🎤 {s}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.section}>Deskripsi</Text>
        <Text style={styles.text}>{event.description}</Text>

        <Text style={styles.section}>Harga Tiket</Text>
        {event.tickets.map((t) => (
          <View key={t.id} style={styles.priceRow}>
            <Text style={styles.priceName}>{t.name}</Text>
            <Text style={styles.priceValue}>{formatRupiah(t.price)}</Text>
          </View>
        ))}

        <View style={{ marginTop: 24 }}>
          <ButtonComponent
            title="Pesan Tiket"
            onPress={() => navigation.navigate('Booking', { event })}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  frame: {
    backgroundColor: COLORS.pink,
    borderWidth: 5,
    borderColor: COLORS.gold,
    borderRadius: 18,
    padding: 8,
    marginBottom: 18,
  },
  image: { width: '100%', height: 420, borderRadius: 10 },
  label: { fontSize: 11, letterSpacing: 2, color: COLORS.text },
  title: {
    fontFamily: FONT_SERIF,
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.maroon,
    marginVertical: 6,
  },
  text: { color: COLORS.text, fontSize: 14, lineHeight: 21, marginTop: 2 },
  section: {
    fontFamily: FONT_SERIF,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.maroon,
    marginTop: 20,
    marginBottom: 8,
  },
  starRow: { flexDirection: 'row', flexWrap: 'wrap' },
  starChip: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  starText: { color: COLORS.maroon, fontWeight: '700', fontSize: 12 },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.blue,
  },
  priceName: { color: COLORS.text, fontWeight: '600' },
  priceValue: { color: COLORS.maroon, fontWeight: '800' },
});