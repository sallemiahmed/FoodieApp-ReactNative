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

const { width } = Dimensions.get('window');

export default function CustomRecipesScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = route.params;

  const parseIngredients = () => {
    if (!recipe.ingredients) return [];
    return recipe.ingredients.split('\n').filter((line) => line.trim());
  };

  const parseInstructions = () => {
    if (!recipe.instructions) return [];
    return recipe.instructions.split('\n').filter((line) => line.trim());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.image || 'https://via.placeholder.com/400x300' }}
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
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>{recipe.name}</Text>

          {/* Category Badge */}
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.category || 'Custom Recipe'}</Text>
            </View>
            <View style={[styles.badge, styles.customBadge]}>
              <Text style={styles.badgeText}>📝 My Recipe</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>👥</Text>
              <Text style={styles.statValue}>{recipe.servings || '4'}</Text>
              <Text style={styles.statLabel}>Servings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statValue}>{recipe.prepTime || '30'}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🔥</Text>
              <Text style={styles.statValue}>{recipe.difficulty || 'Medium'}</Text>
              <Text style={styles.statLabel}>Difficulty</Text>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {parseIngredients().map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.ingredientDot} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
            {parseIngredients().length === 0 && (
              <Text style={styles.emptyText}>No ingredients added</Text>
            )}
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {parseInstructions().map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
            {parseInstructions().length === 0 && (
              <Text style={styles.emptyText}>No instructions added</Text>
            )}
          </View>

          {/* Notes */}
          {recipe.notes && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notes</Text>
              <View style={styles.notesBox}>
                <Text style={styles.notesText}>{recipe.notes}</Text>
              </View>
            </View>
          )}

          {/* Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('RecipesForm', { recipe, isEdit: true })}
          >
            <Text style={styles.editButtonText}>✏️ Edit Recipe</Text>
          </TouchableOpacity>
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
    height: 280,
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
  badgeRow: {
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
  customBadge: {
    backgroundColor: '#8B5CF6',
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
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  notesBox: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
  },
  notesText: {
    fontSize: 15,
    color: '#92400E',
    lineHeight: 22,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    fontStyle: 'italic',
  },
  editButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
