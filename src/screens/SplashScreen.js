import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { COLORS, FONT_SERIF } from '../theme';

const { width } = Dimensions.get('window');

// Props: onFinish (dipanggil setelah animasi selesai)
export default function SplashScreen({ onFinish }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const tagOpacity = useRef(new Animated.Value(0)).current;
  const waveY = useRef(new Animated.Value(260)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(waveY, {
        toValue: 0,
        duration: 1100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(tagOpacity, {
        toValue: 1,
        duration: 800,
        delay: 700,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => onFinish && onFinish(), 2900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.ticket}>
          <View style={[styles.notch, { left: -9 }]} />
          <View style={[styles.notch, { right: -9 }]} />
          <Text style={styles.note}>♪</Text>
        </View>

        <Text style={styles.logoText}>KonserKu</Text>
        <Animated.Text style={[styles.tagline, { opacity: tagOpacity }]}>
          LIVE MUSIC · REAL MOMENTS
        </Animated.Text>
      </Animated.View>

      <Animated.View style={[styles.waveWrap, { transform: [{ translateY: waveY }] }]}>
        <View style={[styles.wave, styles.waveBlue]} />
        <View style={[styles.wave, styles.wavePink]} />
        <View style={[styles.wave, styles.waveCream]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.maroon,
    alignItems: 'center',
  },
  logoWrap: { marginTop: '32%', alignItems: 'center' },
  ticket: {
    width: 84,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    borderWidth: 3,
    borderColor: COLORS.gold,
  },
  notch: {
    position: 'absolute',
    top: 17,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.maroon,
  },
  note: { fontSize: 30, color: COLORS.maroon, fontWeight: '800' },
  logoText: {
    fontFamily: FONT_SERIF,
    fontStyle: 'italic',
    fontSize: 54,
    fontWeight: '800',
    color: COLORS.bg,
    letterSpacing: 1,
  },
  tagline: {
    marginTop: 8,
    fontSize: 11,
    letterSpacing: 4,
    color: COLORS.blue,
    fontWeight: '700',
  },
  waveWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 260,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    height: 260,
    borderRadius: 260,
  },
  waveBlue: {
    width: width * 1.7,
    left: -width * 0.2,
    bottom: -120,
    backgroundColor: COLORS.blue,
  },
  wavePink: {
    width: width * 1.8,
    left: -width * 0.6,
    bottom: -150,
    backgroundColor: COLORS.pink,
  },
  waveCream: {
    width: width * 1.9,
    left: -width * 0.35,
    bottom: -185,
    backgroundColor: COLORS.bg,
  },
});