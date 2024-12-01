import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose other icons if needed

// Define the categories
const categories = [
  { id: '2', title: 'Restaurants', icon: 'cutlery' },
  { id: '3', title: 'Cafes', icon: 'coffee' },
  { id: '4', title: 'Hotels', icon: 'bed' },
  { id: '5', title: 'Attractions', icon: 'map-marker' },
];

const CategoryList = ({ setSelectedCategory }) => {
  const [currentCategory, setCurrentCategory] = useState('All'); // Default to 'All'

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.title);
    setCurrentCategory(category.title);
  };

  // Render each category item
  const renderCategory = ({ item }) => {
    const isSelected = currentCategory === item.title; // Check if the category is selected

    return (
      <TouchableOpacity
        className={`
          flex-row items-center py-3 px-5 mr-5 mb-2 rounded-xl border-2
          ${isSelected ? 'bg-[#FFBB94] border-[#FFBB94]' : 'bg-white border-[#FFBB94]'}
        `}
        onPress={() => handleCategorySelect(item)}
      >
        <Icon
          name={item.icon}
          size={22}
          color={isSelected ? '#4B5563' : '#FFBB94'} // Icon color for selected category
          className="mr-3"
        />
        <Text
          className={`
            text-lg font-bold
            ${isSelected ? 'text-white' : 'text-gray-600'}
          `}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mt-1 px-4 bg-[#F9FAFB]">
      <Text className="text-2xl font-bold mb-2 text-black">
        Category
      </Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
      />
    </View>
  );
};

export default CategoryList;
