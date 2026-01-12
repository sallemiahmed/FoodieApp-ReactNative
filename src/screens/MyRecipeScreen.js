import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const CUSTOM_RECIPES_KEY = '@custom_recipes';

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);

  const loadRecipes = async () => {
    try {
      const stored = await AsyncStorage.getItem(CUSTOM_RECIPES_KEY);
      if (stored) {
        setRecipes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = recipes.filter((r) => r.id !== id);
            setRecipes(updated);
            await AsyncStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(updated));
          },
        },
      ]
    );
  };

  const handleEdit = (recipe) => {
    navigation.navigate('RecipesForm', { recipe, isEdit: true });
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => navigation.navigate('CustomRecipes', { recipe: item })}
    >
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }}
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={styles.recipeContent}>
        <Text style={styles.recipeName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.recipeCategory}>{item.category || 'Custom'}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.actionButtonText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.actionButtonText}>🗑️ Delete</Text>
          </TouchableOpacity>
        </View>
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
        <Text style={styles.headerTitle}>My Recipes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('RecipesForm')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={styles.emptyTitle}>No custom recipes</Text>
          <Text style={styles.emptyText}>
            Create your own recipes and they will appear here!
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('RecipesForm')}
          >
            <Text style={styles.createButtonText}>Create Recipe</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  recipeCard: {
    flexDirection: 'row',
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
  recipeImage: {
    width: 120,
    height: 130,
  },
  recipeContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recipeCategory: {
    fontSize: 13,
    color: '#F97316',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#E0F2FE',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
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
  createButton: {
    backgroundColor: '#F97316',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
