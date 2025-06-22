import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  ingredientBox: {
    padding: 10,
    borderRadius: 6,
    marginVertical: 4,
    width: '100%',
  },
  ingredientText: {
    color: 'white',
    fontWeight: 'bold',
  },
  safe: {
    backgroundColor: '#4CAF50',
  },
  caution: {
    backgroundColor: '#FF9800',
  },
  danger: {
    backgroundColor: '#F44336',
  },
});
