import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ButtonComponent from '../components/ButtonComponent';
import { COLORS, FONT_SERIF } from '../theme';
import { formatRupiah } from '../utils/format';

export default function ConfirmationScreen({ route, navigation }) {
  const { event, items, totalPrice } = route.params;
  const [ticketCode, setTicketCode] = useState('');

  // useEffect: membuat kode tiket unik saat halaman muncul
  useEffect(() => {
    const code =
      'KK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setTicketCode(code);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent title="Berhasil! 🎉" subtitle="Tiket digitalmu sudah siap" />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.ticket}>
          <Text style={styles.label}>E-TICKET</Text>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.text}>{event.artist}</Text>

          <View style={styles.divider} />

          <Text style={styles.text}>📅 {event.date} • {event.time}</Text>
          <Text style={styles.text}>📍 {event.location}</Text>

          <View style={styles.divider} />

          {items.map((it) => (
            <View key={it.name} style={styles.row}>
              <Text style={styles.text}>
                {it.qty}x {it.name}
              </Text>
              <Text style={styles.bold}>{formatRupiah(it.price * it.qty)}</Text>
            </View>
          ))}

          <View style={styles.row}>
            <Text style={styles.bold}>Total Bayar</Text>
            <Text style={styles.total}>{formatRupiah(totalPrice)}</Text>
          </View>

          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>KODE BOOKING</Text>
            <Text style={styles.code}>{ticketCode}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <ButtonComponent
            title="Kembali ke Beranda"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  ticket: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  label: { fontSize: 11, letterSpacing: 3, color: COLORS.muted },
  title: {
    fontFamily: FONT_SERIF,
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.maroon,
    marginTop: 4,
  },
  text: { color: COLORS.text, fontSize: 14, marginTop: 4 },
  bold: { color: COLORS.text, fontWeight: '700' },
  divider: {
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.blue,
    marginVertical: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  total: { color: COLORS.maroon, fontWeight: '800', fontSize: 18 },
  codeBox: {
    marginTop: 18,
    backgroundColor: COLORS.blue,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  codeLabel: { fontSize: 11, letterSpacing: 2, color: COLORS.maroon },
  code: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.maroon,
    letterSpacing: 4,
  },
});