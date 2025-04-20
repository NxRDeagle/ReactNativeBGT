import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/home/HomeScreen';
import AssemblyScreen from '../screens/assembly/AssemblyScreen';
import RegistrationScreen from '../screens/auth/Registration';
import LoginScreen from '../screens/auth/Login';
import CreateAssemblyScreen from '../screens/create_assembly/CreateAssemblyScreen';
import CreatePcComponent from '../screens/create_pc_component/CreatePcComponent';
import AssemblyComments from '../screens/assembly_comments/AssemblyComments';
import AboutApp from '../screens/about_app/AboutApp';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Assemblies':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Auth':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'CreateAssembly':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'AboutApp':
              iconName = focused ? 'information-circle' : 'information-circle-outline';
              break;
            default:
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
        options={{title: 'Сборки'}}
      />
      <Tab.Screen
        name="CreateAssembly"
        component={CreateAssemblyScreen}
        options={{title: 'Создать сборку'}}
      />
      <Tab.Screen
        name="Auth"
        component={LoginScreen}
        options={{title: 'Вход'}}
      />
      <Tab.Screen
        name="AboutApp"
        component={AboutApp}
        options={{title: 'О приложении'}}
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Assembly"
          component={AssemblyScreen}
          options={{title: 'Сборка'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePcComponent"
          component={CreatePcComponent}
          options={{title: 'Создание компонента'}}
        />
        <Stack.Screen
          name="AssemblyComments"
          component={AssemblyComments}
          options={{title: 'Отзывы об сборке'}}
        />
        <Stack.Screen
          name="AboutApp"
          component={AboutApp}
          options={{title: 'О приложении'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
