import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import MyRecipeScreen from '../screens/MyRecipeScreen';
import CustomRecipesScreen from '../screens/CustomRecipesScreen';
import RecipesFormScreen from '../screens/RecipesFormScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="MyRecipes" component={MyRecipeScreen} />
        <Stack.Screen name="CustomRecipes" component={CustomRecipesScreen} />
        <Stack.Screen name="RecipesForm" component={RecipesFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
