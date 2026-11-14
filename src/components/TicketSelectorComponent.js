import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';
import { formatRupiah } from '../utils/format';

// Props: ticket, quantity, onIncrease, onDecrease
export default function TicketSelectorComponent({
  ticket,
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <View style={[styles.row, quantity > 0 && styles.active]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{ticket.name}</Text>
        <Text style={styles.price}>{formatRupiah(ticket.price)}</Text>
      </View>

      <View style={styles.counter}>
        <TouchableOpacity style={styles.circle} onPress={onDecrease}>
          <Text style={styles.circleText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{quantity}</Text>
        <TouchableOpacity style={styles.circle} onPress={onIncrease}>
          <Text style={styles.circleText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  active: { borderColor: COLORS.maroon, backgroundColor: '#F3F7FC' },
  name: { fontSize: 16, fontWeight: '800', color: COLORS.maroon },
  price: { marginTop: 2, color: COLORS.text },
  counter: { flexDirection: 'row', alignItems: 'center' },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.maroon,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: { color: COLORS.white, fontSize: 20, fontWeight: '700' },
  qty: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.maroon,
  },
});