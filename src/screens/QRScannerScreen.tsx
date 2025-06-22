import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/QRScannesScreen';

export default function QrScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    if (!data || data.length < 8) {
      Alert.alert('Geçersiz Barkod', 'Lütfen geçerli bir barkod okutunuz.');
      setScanned(false);
      return;
    }
    navigation.navigate('ProductDetail', { barcode: data });
  };

  if (hasPermission === null) return <Text>İzin isteniyor...</Text>;
  if (hasPermission === false) return <Text>Kamera izni verilmedi.</Text>;

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.overlay}>
          <Button title="Tekrar Tara" onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}

