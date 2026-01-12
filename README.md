# Foodie App - React Native

A beautiful recipe app built with React Native and Expo. Discover delicious recipes, save your favorites, and create your own culinary masterpieces!

## Features

- **10+ Recipe Categories**: Beef, Chicken, Dessert, Lamb, Pasta, Seafood, Vegetarian, Vegan, Breakfast, and more
- **Favorites System**: Save your favorite recipes using Redux
- **Custom Recipes**: Create, edit, and delete your own recipes with AsyncStorage
- **Beautiful UI**: Modern design with smooth animations
- **Search Functionality**: Find recipes quickly by name
- **Detailed Recipe View**: Ingredients, instructions, servings, calories, and difficulty

## Screenshots

*Coming soon*

## Tech Stack

- React Native
- Expo
- Redux Toolkit
- React Navigation
- AsyncStorage

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sallemiahmed/FoodieApp-ReactNative.git
cd FoodieApp-ReactNative
```

2. Install dependencies:
```bash
npm install
```

3. Start the app:
```bash
npx expo start
```

## Project Structure

```
src/
├── components/
│   ├── categories.js
│   └── recipes.js
├── navigation/
│   └── index.js
├── redux/
│   ├── store.js
│   └── favoritesSlice.js
└── screens/
    ├── WelcomeScreen.js
    ├── HomeScreen.js
    ├── RecipeDetailScreen.js
    ├── FavoriteScreen.js
    ├── MyRecipeScreen.js
    ├── CustomRecipesScreen.js
    └── RecipesFormScreen.js
```

## License

MIT
