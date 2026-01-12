import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2;

export default function Recipes({ recipes }) {
  const navigation = useNavigation();

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardOverlay}>
        <View style={styles.difficultyBadge}>
          <Text style={styles.difficultyText}>{item.difficulty || 'Medium'}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.strMeal}
        </Text>
        <View style={styles.cardMeta}>
          <Text style={styles.cardCategory}>{item.strCategory}</Text>
          <View style={styles.cardStats}>
            <Text style={styles.cardStat}>🔥 {item.calories || '450'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🍳</Text>
        <Text style={styles.emptyTitle}>No recipes found</Text>
        <Text style={styles.emptyText}>Try a different category or search term</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recipes</Text>
      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  card: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 130,
  },
  cardOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: 12,
    color: '#F97316',
    fontWeight: '500',
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardStat: {
    fontSize: 11,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
