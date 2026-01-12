import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavorites, toggleFavorite } from '../redux/favoritesSlice';

const { width } = Dimensions.get('window');
const cardWidth = (width - 50) / 2;

export default function FavoriteScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const handleRemoveFavorite = (recipe) => {
    dispatch(toggleFavorite(recipe));
  };

  const renderRecipeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
    >
      <Image
        source={{ uri: item.strMealThumb }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item)}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {item.strMeal}
        </Text>
        <Text style={styles.cardCategory}>{item.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>💔</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Start exploring recipes and add them to your favorites!
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreButtonText}>Explore Recipes</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 22,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
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
    height: 140,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: '#F97316',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#F97316',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
