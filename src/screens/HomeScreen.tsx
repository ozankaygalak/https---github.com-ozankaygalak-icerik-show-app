import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreenStyle';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İçerik Analizi</Text>
      <Text style={styles.subtitle}>Ürün içeriğini öğrenmek için QR kodu tarayın.</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Qr')}>
        <Text style={styles.buttonText}>QR Kod Tara</Text>
      </Pressable>
    </View>
  );
}
