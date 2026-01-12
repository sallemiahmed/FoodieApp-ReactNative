import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function Categories({ categories, activeCategory, setActiveCategory }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* All Category */}
        <TouchableOpacity
          style={[
            styles.categoryItem,
            activeCategory === 'All' && styles.categoryItemActive,
          ]}
          onPress={() => setActiveCategory('All')}
        >
          <View
            style={[
              styles.categoryImageContainer,
              activeCategory === 'All' && styles.categoryImageContainerActive,
            ]}
          >
            <Text style={styles.allIcon}>🍽️</Text>
          </View>
          <Text
            style={[
              styles.categoryName,
              activeCategory === 'All' && styles.categoryNameActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        {/* Other Categories */}
        {categories.map((category) => (
          <TouchableOpacity
            key={category.idCategory}
            style={[
              styles.categoryItem,
              activeCategory === category.strCategory && styles.categoryItemActive,
            ]}
            onPress={() => setActiveCategory(category.strCategory)}
          >
            <View
              style={[
                styles.categoryImageContainer,
                activeCategory === category.strCategory &&
                  styles.categoryImageContainerActive,
              ]}
            >
              <Image
                source={{ uri: category.strCategoryThumb }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
            </View>
            <Text
              style={[
                styles.categoryName,
                activeCategory === category.strCategory && styles.categoryNameActive,
              ]}
              numberOfLines={1}
            >
              {category.strCategory}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  scrollContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    width: 70,
  },
  categoryItemActive: {},
  categoryImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
  },
  categoryImageContainerActive: {
    backgroundColor: '#FFF5E6',
    borderWidth: 2,
    borderColor: '#F97316',
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  allIcon: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#F97316',
    fontWeight: '600',
  },
});
