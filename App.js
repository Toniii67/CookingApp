import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';
import welcomeScreen from './screens/welcomeScreen';
import homeScreen from './screens/homeScreen';
import profileScreen from './screens/profileScreen';
import settingsScreen from './screens/settingsScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import TutorCookScreen from './screens/TutorCookScreen';
import { CookingProvider } from './components/CookingContext';

const firebaseConfig = {
  apiKey: "AIzaSyC-SjzJvVHQkEv93JMcf9tFEi6X4l0ztkM",
  authDomain: "project-uas-hybrid.firebaseapp.com",
  projectId: "project-uas-hybrid",
  storageBucket: "project-uas-hybrid.firebasestorage.app",
  messagingSenderId: "348679341087",
  appId: "1:348679341087:web:bfd71589e2f7dcecfd812a",
  measurementId: "G-J16NE9ZVZD"
};

const SESSION_DURATION = 20 * 60 * 1000;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {db}

// Custom Navigation Theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFAC1C',
    background: '#FCFCFC',
    card: 'white',
    text: '#000000',
    border: '#E5E5E5',
    notification: '#FF3B30',
  },
  animation: {
    useNativeDriver: false
  }
};

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
            iconName = 'storefront-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#FFAC1C',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#E5E5E5',
          paddingTop: 5,
          paddingBottom: 5,
          height: 60
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={homeScreen}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={profileScreen}
        options={{
          tabBarLabel: 'Supermarket'
        }}
      />
      <Tab.Screen
        name="Settings"
        component={settingsScreen}
        options={{
          tabBarLabel: 'Settings'
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FCFCFC' }
      }}
    >
      <Stack.Screen name="welcome" component={welcomeScreen} />
      <Stack.Screen name="login" component={loginScreen} />
      <Stack.Screen name="register" component={registerScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('userSession');
      if (sessionData) {
        const { timestamp, userData } = JSON.parse(sessionData);
        const currentTime = new Date().getTime();
        
        if (currentTime - timestamp < SESSION_DURATION) {
          setUser(userData);
        } else {
          await AsyncStorage.removeItem('userSession');
          await signOut(auth);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const saveSession = async (userData) => {
    try {
      const sessionData = {
        timestamp: new Date().getTime(),
        userData
      };
      await AsyncStorage.setItem('userSession', JSON.stringify(sessionData));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  useEffect(() => {
    checkSession();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        saveSession(user);
      }
      setUser(user);
      if (initializing) setInitializing(false);
      return () => unsubscribe();
    }, [initializing]);

    const sessionInterval = setInterval(checkSession, 60000);

    return () => {
      unsubscribe();
      clearInterval(sessionInterval);
    };
  }, [initializing]);

  if (initializing) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FCFCFC'
      }}>
        <ActivityIndicator size="large" color="#FFAC1C" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <CookingProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#FCFCFC' }
          }}
        >
          {user ? (
            <>
              <Stack.Screen
                name="MainApp"
                component={HomeTabs}
                options={{
                  animationEnabled: true
                }}
              />
              <Stack.Screen
                name="recipeDetail"
                component={RecipeDetailScreen}
                options={{
                  animationEnabled: true
                }}
              />
              <Stack.Screen
                name="tutorCook"
                component={TutorCookScreen}
                options={{
                  animationEnabled: true
                }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthStack}
              options={{
                animationEnabled: true
              }}
            />
          )}
        </Stack.Navigator>
      </CookingProvider>
    </NavigationContainer>
  );
}