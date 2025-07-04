import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import StackNavigator from './navigation/StackNavigator.jsx';
import { SettingsProvider, SettingsContext } from './contexts/SettingsContext.jsx';

// Improve memory usage and performance for navigation
enableScreens();

export default function App() {
  return (
    <SettingsProvider>
      <InnerApp />
    </SettingsProvider>
  );
}

function InnerApp() {
  const { settings } = useContext(SettingsContext);
  return (
    <NavigationContainer
      theme={settings.darkMode ? DarkTheme : DefaultTheme}
      testID="navigation-container"
    >
      <StackNavigator />
    </NavigationContainer>
  );
}
