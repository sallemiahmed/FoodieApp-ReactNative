import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFavorite } from '../redux/favoritesSlice';

const { width } = Dimensions.get('window');

export default function RecipeDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { recipe } = route.params;
  const isFavorite = useSelector(selectIsFavorite(recipe.idMeal));

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure: measure || '' });
      }
    }
    return ingredients;
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.strMealThumb }}
            style={styles.image}
            resizeMode="cover"
          />
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleToggleFavorite}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title and Category */}
          <Text style={styles.title}>{recipe.strMeal}</Text>
          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.strCategory}</Text>
            </View>
            {recipe.strArea && (
              <View style={[styles.badge, styles.areaBadge]}>
                <Text style={styles.badgeText}>{recipe.strArea}</Text>
              </View>
            )}
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue}>{recipe.servings || '4'}</Text>
              <Text style={styles.statLabel}>Servings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{recipe.calories || '450'}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statValue}>{recipe.difficulty || 'Medium'}</Text>
              <Text style={styles.statLabel}>Difficulty</Text>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {getIngredients().map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientText}>
                  {item.measure} {item.ingredient}
                </Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{recipe.strInstructions}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: width,
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonText: {
    fontSize: 22,
  },
  content: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  areaBadge: {
    backgroundColor: '#3B82F6',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredientDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F97316',
    marginRight: 12,
  },
  ingredientText: {
    fontSize: 16,
    color: '#444',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 26,
    color: '#444',
  },
});
