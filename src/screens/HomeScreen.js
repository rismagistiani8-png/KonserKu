import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import EventCardComponent from '../components/EventCardComponent';
import { CONCERTS } from '../data/concerts';
import { COLORS, FONT_SERIF } from '../theme';

const FILTERS = ['Semua', 'Trending'];

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Semua');

  // useEffect: simulasi mengambil data (lifecycle saat halaman pertama dibuka)
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(CONCERTS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer); // cleanup
  }, []);

  const shownEvents =
    filter === 'Trending' ? events.filter((e) => e.trending) : events;

  const renderHero = () => (
    <View>
      <Text style={styles.heroTitle}>
        Live music.{'\n'}Real moments.{'\n'}Memories that last.
      </Text>
      <Text style={styles.heroDesc}>
        Temukan konser favoritmu, pilih tiket, dan pesan dalam hitungan detik.
      </Text>

      {/* Pita bergaris biru-krem seperti di desain */}
      <View style={styles.stripes}>
        {Array.from({ length: 24 }).map((_, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: i % 2 === 0 ? COLORS.blue : COLORS.bg,
            }}
          />
        ))}
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.chip, filter === f && styles.chipActive]}
          >
            <Text style={[styles.chipText, filter === f && { color: COLORS.white }]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent title="KonserKu" subtitle="Tiket konser favoritmu 🎶" />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.maroon} style={{ marginTop: 60 }} />
      ) : (
        <FlatList
          data={shownEvents}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHero}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <EventCardComponent
              event={item}
              onPress={() => navigation.navigate('Detail', { event: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  heroTitle: {
    fontFamily: FONT_SERIF,
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.maroon,
    lineHeight: 32,
  },
  heroDesc: { marginTop: 8, color: COLORS.text, fontSize: 13 },
  stripes: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 16,
  },
  filterRow: { flexDirection: 'row', marginBottom: 14 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.maroon,
    marginRight: 10,
  },
  chipActive: { backgroundColor: COLORS.maroon },
  chipText: { color: COLORS.maroon, fontWeight: '700' },
});