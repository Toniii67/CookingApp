
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';
import welcomeScreen from './screens/welcomeScreen';
import homeScreen from './screens/homeScreen';
import profileScreen from './screens/profileScreen';
import settingsScreen from './screens/settingsScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import TutorCookScreen from './screens/TutorCookScreen';
import { CookingProvider } from './components/CookingContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#FFAC1C',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={homeScreen} />
      <Tab.Screen name="Profile" component={profileScreen} />
      <Tab.Screen name="Settings" component={settingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <CookingProvider>


        <Stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" component={welcomeScreen} />
          <Stack.Screen name="login" component={loginScreen} />
          <Stack.Screen name="register" component={registerScreen} />
          <Stack.Screen name="home" component={HomeTabs} />
          <Stack.Screen name="recipeDetail" component={RecipeDetailScreen} />
          <Stack.Screen name="tutorCook" component={TutorCookScreen} />
        </Stack.Navigator>
      </CookingProvider>
    </NavigationContainer>
  );
}
