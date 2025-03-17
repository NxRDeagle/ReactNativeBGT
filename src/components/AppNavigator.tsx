import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import RecommendationsScreen from './screens/RecommendationsScreen';
// import NotificationsScreen from './screens/NotificationsScreen';
// import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}: {route: Route}) => ({
          tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
            let iconName: string;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Recommendations') {
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
          name="Home"
          component={HomeScreen}
          options={{title: 'Главная'}}
        />
        <Tab.Screen
          name="Recommendations"
          component={HomeScreen}
          options={{title: 'Рекомендации'}}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{title: 'Профиль'}}
        />
        <Tab.Screen
          name="Settings"
          component={HomeScreen}
          options={{title: 'Настройки'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
