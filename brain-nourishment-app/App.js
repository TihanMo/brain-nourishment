import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import StackNavigator from './navigation/StackNavigator.jsx';
import { SettingsProvider } from './contexts/SettingsContext.jsx';

// Improve memory usage and performance for navigation
enableScreens();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer testID="navigation-container">
        <StackNavigator />
      </NavigationContainer>
    </SettingsProvider>
  );
}
