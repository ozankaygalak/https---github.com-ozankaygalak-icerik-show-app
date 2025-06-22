import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from '../styles/DetailScreen';
import { Product } from '../types';

type RouteParams = {
  DetailScreen: {
    product: Product;
  };
};

type RiskLevel = 'safe' | 'caution' | 'danger';

const riskStyles: Record<RiskLevel, any> = {
  safe: styles.safe,
  caution: styles.caution,
  danger: styles.danger,
};


export default function DetailScreen() {
  const route = useRoute<RouteProp<RouteParams, 'DetailScreen'>>();
  const product = route.params.product;

  if (!product) return <Text>Ürün verisi bulunamadı.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} />
      ) : null}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.title}>İçindekiler:</Text>
      {product.ingredients.map((ingredient, index) => (
        <View key={index} style={[styles.ingredientBox, riskStyles[ingredient.risk as RiskLevel]]}>

          <Text style={styles.ingredientText}>{ingredient.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
