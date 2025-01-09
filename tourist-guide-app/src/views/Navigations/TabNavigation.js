import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import HomeNavigation from './HomeNavigation';
import SearchNavigation from './SearchNavigation';

/**
 * TabNavigation component sets up the bottom tab navigation for the app.
 * It includes three tabs: Home, Search, and Profile. Each tab has a corresponding icon and label.
 * The Home and Search tabs use their respective navigation stacks.
 * 
 * @component
 * @returns {JSX.Element} The BottomTabNavigator containing the Home, Search, and Profile screens.
 */
export const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Hide header on all tabs
        tabBarStyle: 'bg-blue-600', // Tailwind class for background color of the tab bar
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarLabelStyle: 'text-white font-bold', // Tailwind for text styling
          tabBarIconStyle: 'p-2', // Tailwind for padding around the icon
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
          tabBarLabelStyle: 'text-white font-bold',
          tabBarIconStyle: 'p-2',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" color={color} size={size} />
          ),
          tabBarLabelStyle: 'text-white font-bold',
          tabBarIconStyle: 'p-2',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
