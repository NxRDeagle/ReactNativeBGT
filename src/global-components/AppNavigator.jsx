import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/home/HomeScreen';
import AssemblyScreen from '../screens/assembly/AssemblyScreen';
import RegistrationScreen from '../screens/auth/Registration';
import LoginScreen from '../screens/auth/Login';
// import ProfileScreen from './screens/ProfileScreen';
// import RecommendationsScreen from './screens/RecommendationsScreen';
// import NotificationsScreen from './screens/NotificationsScreen';
// import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Assemblies') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Auth') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Assemblies') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Assemblies"
        component={HomeScreen}
        options={{ title: 'Сборки' }}
      />
      <Tab.Screen
        name="Auth"
        component={LoginScreen}
        options={{ title: 'Вход' }}
      />
      <Tab.Screen
        name="Settings"
        component={HomeScreen}
        options={{ title: 'Настройки' }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Assembly"
          component={AssemblyScreen}
          options={{ title: 'Сборка' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
