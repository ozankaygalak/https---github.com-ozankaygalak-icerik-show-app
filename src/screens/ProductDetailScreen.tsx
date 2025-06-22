import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { fetchProduct } from '../services/productService';
import { db, auth } from '../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

export default function ProductDetailScreen() {
  const route = useRoute<any>();
  const { barcode } = route.params;

  const [product, setProduct] = useState<any>(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProduct(barcode);
      setProduct(data);
    };

    const loadComments = async () => {
      const q = query(
        collection(db, 'comments'),
        where('productId', '==', barcode),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const fetchedComments = snapshot.docs.map(doc => doc.data());
      setComments(fetchedComments);
    };

    loadProduct();
    loadComments();
  }, [barcode]);

  const handleAddComment = async () => {
    if (!auth.currentUser) {
      alert('Yorum yazmak için giriş yapmalısınız.');
      return;
    }

    if (commentText.trim().length === 0) return;

    await addDoc(collection(db, 'comments'), {
      productId: barcode,
      userId: auth.currentUser.uid,
      text: commentText,
      createdAt: Timestamp.now(),
    });

    setCommentText('');
    // Yorumları tekrar çek
    const snapshot = await getDocs(
      query(
        collection(db, 'comments'),
        where('productId', '==', barcode),
        orderBy('createdAt', 'desc')
      )
    );
    const fetchedComments = snapshot.docs.map(doc => doc.data());
    setComments(fetchedComments);
  };

  if (!product) return <Text>Yükleniyor...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      {product.image && <Image source={{ uri: product.image }} style={styles.image} />}
      <Text style={styles.brand}>{product.brand}</Text>

      <Text style={styles.sectionTitle}>İçerikler</Text>
      {product.ingredients.map((ing: any, index: number) => (
        <Text
          key={index}
          style={{
            color:
              ing.risk === 'danger' ? 'red' : ing.risk === 'caution' ? 'orange' : 'green',
          }}
        >
          - {ing.name}
        </Text>
      ))}

      <View style={styles.commentSection}>
        <Text style={styles.sectionTitle}>Yorumlar</Text>
        {comments.map((c, i) => (
          <Text key={i}>• {c.text}</Text>
        ))}

        <TextInput
          style={styles.input}
          placeholder="Yorumunuzu yazın..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button title="Gönder" onPress={handleAddComment} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  brand: { fontSize: 18, color: 'gray', marginBottom: 12 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginVertical: 12 },
  sectionTitle: { fontSize: 20, marginTop: 20, fontWeight: '600' },
  commentSection: { marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
  },
});
