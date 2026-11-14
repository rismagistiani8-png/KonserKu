import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import TicketSelectorComponent from '../components/TicketSelectorComponent';
import ButtonComponent from '../components/ButtonComponent';
import { COLORS, FONT_SERIF } from '../theme';
import { formatRupiah } from '../utils/format';

const MAX_QTY = 10;

export default function BookingScreen({ route, navigation }) {
  const { event } = route.params;

  // State: jumlah tiap kategori, contoh { t1: 2, t2: 0 }
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);

  // useEffect: hitung ulang total setiap jumlah tiket berubah
  useEffect(() => {
    let price = 0;
    let count = 0;
    event.tickets.forEach((t) => {
      const q = quantities[t.id] || 0;
      price += q * t.price;
      count += q;
    });
    setTotalPrice(price);
    setTotalTickets(count);
  }, [quantities, event.tickets]);

  const changeQty = (id, delta) => {
    setQuantities((prev) => {
      const next = Math.min(MAX_QTY, Math.max(0, (prev[id] || 0) + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleConfirm = () => {
    const items = event.tickets
      .filter((t) => (quantities[t.id] || 0) > 0)
      .map((t) => ({ name: t.name, price: t.price, qty: quantities[t.id] }));

    navigation.navigate('Confirmation', { event, items, totalPrice });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Pesan Tiket"
        subtitle={event.title}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.section}>Pilih Kategori & Jumlah</Text>
        {event.tickets.map((t) => (
          <TicketSelectorComponent
            key={t.id}
            ticket={t}
            quantity={quantities[t.id] || 0}
            onIncrease={() => changeQty(t.id, 1)}
            onDecrease={() => changeQty(t.id, -1)}
          />
        ))}
      </ScrollView>

      {/* Bar total di bawah */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total ({totalTickets} tiket)</Text>
          <Text style={styles.totalValue}>{formatRupiah(totalPrice)}</Text>
        </View>
        <ButtonComponent
          title="Konfirmasi Pesanan"
          onPress={handleConfirm}
          disabled={totalTickets === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  section: {
    fontFamily: FONT_SERIF,
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.maroon,
    marginBottom: 12,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  totalLabel: { color: COLORS.text, fontWeight: '600' },
  totalValue: { color: COLORS.maroon, fontWeight: '800', fontSize: 18 },
});