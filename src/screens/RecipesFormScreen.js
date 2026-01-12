import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOM_RECIPES_KEY = '@custom_recipes';

const categories = [
  'Beef', 'Chicken', 'Dessert', 'Lamb', 'Pasta',
  'Seafood', 'Vegetarian', 'Vegan', 'Breakfast', 'Other'
];

export default function RecipesFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const existingRecipe = route.params?.recipe;
  const isEdit = route.params?.isEdit;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Other');
  const [servings, setServings] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existingRecipe) {
      setName(existingRecipe.name || '');
      setImage(existingRecipe.image || '');
      setCategory(existingRecipe.category || 'Other');
      setServings(existingRecipe.servings || '');
      setPrepTime(existingRecipe.prepTime || '');
      setDifficulty(existingRecipe.difficulty || 'Medium');
      setIngredients(existingRecipe.ingredients || '');
      setInstructions(existingRecipe.instructions || '');
      setNotes(existingRecipe.notes || '');
    }
  }, [existingRecipe]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a recipe name');
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(CUSTOM_RECIPES_KEY);
      let recipes = stored ? JSON.parse(stored) : [];

      const newRecipe = {
        id: existingRecipe?.id || Date.now().toString(),
        name: name.trim(),
        image: image.trim() || 'https://via.placeholder.com/400x300?text=Recipe',
        category,
        servings,
        prepTime,
        difficulty,
        ingredients,
        instructions,
        notes,
        createdAt: existingRecipe?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEdit) {
        recipes = recipes.map((r) => (r.id === existingRecipe.id ? newRecipe : r));
      } else {
        recipes.push(newRecipe);
      }

      await AsyncStorage.setItem(CUSTOM_RECIPES_KEY, JSON.stringify(recipes));

      Alert.alert(
        'Success',
        isEdit ? 'Recipe updated successfully!' : 'Recipe created successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error saving recipe:', error);
      Alert.alert('Error', 'Failed to save recipe. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEdit ? 'Edit Recipe' : 'New Recipe'}
          </Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.form}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Recipe Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Recipe Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter recipe name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Image URL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor="#999"
              value={image}
              onChangeText={setImage}
              autoCapitalize="none"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    category === cat && styles.categoryChipActive,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === cat && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Row: Servings, Prep Time */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Servings</Text>
              <TextInput
                style={styles.input}
                placeholder="4"
                placeholderTextColor="#999"
                value={servings}
                onChangeText={setServings}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={styles.label}>Prep Time (min)</Text>
              <TextInput
                style={styles.input}
                placeholder="30"
                placeholderTextColor="#999"
                value={prepTime}
                onChangeText={setPrepTime}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Difficulty */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.difficultyRow}>
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyBtn,
                    difficulty === level && styles.difficultyBtnActive,
                  ]}
                  onPress={() => setDifficulty(level)}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      difficulty === level && styles.difficultyTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ingredients</Text>
            <Text style={styles.hint}>Enter each ingredient on a new line</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="1 cup flour&#10;2 eggs&#10;1/2 cup sugar"
              placeholderTextColor="#999"
              value={ingredients}
              onChangeText={setIngredients}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Instructions */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Instructions</Text>
            <Text style={styles.hint}>Enter each step on a new line</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Preheat oven to 350°F&#10;Mix dry ingredients&#10;Add wet ingredients"
              placeholderTextColor="#999"
              value={instructions}
              onChangeText={setInstructions}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>

          {/* Notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (optional)</Text>
            <TextInput
              style={[styles.input, styles.textAreaSmall]}
              placeholder="Any additional tips or notes..."
              placeholderTextColor="#999"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEdit ? '💾 Update Recipe' : '✨ Create Recipe'}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  keyboardView: {
    flex: 1,
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
  form: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  textAreaSmall: {
    minHeight: 80,
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 15,
  },
  halfInput: {
    flex: 1,
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  categoryChipActive: {
    backgroundColor: '#F97316',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  difficultyRow: {
    flexDirection: 'row',
    gap: 10,
  },
  difficultyBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  difficultyBtnActive: {
    backgroundColor: '#F97316',
  },
  difficultyText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  difficultyTextActive: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40,
  },
});
