declare module '@react-navigation/bottom-tabs' {
  import {
    BottomTabNavigationOptions,
    BottomTabNavigationEventMap,
  } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
  import {
    NavigationState,
    ParamListBase,
    RouteConfig,
    RouteProp,
  } from '@react-navigation/core';
  import * as React from 'react';
  import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

  export interface BottomTabNavigationConfig {
    initialRouteName?: string;
    backBehavior?: 'initialRoute' | 'order' | 'history' | 'none';
    lazy?: boolean;
    tabBar?: (props: BottomTabBarProps) => React.ReactNode;
    tabBarOptions?: BottomTabNavigationOptions;
  }

  export function createBottomTabNavigator<ParamList extends ParamListBase>(): {
    Navigator: React.ComponentType<{
      initialRouteName?: string;
      screenOptions?: BottomTabNavigationOptions;
      tabBar?: (props: BottomTabBarProps) => React.ReactNode;
      children: React.ReactNode;
    }>;
    Screen: React.ComponentType<{
      name: string;
      component: React.ComponentType<any>;
      options?: BottomTabNavigationOptions;
    }>;
  };
}
