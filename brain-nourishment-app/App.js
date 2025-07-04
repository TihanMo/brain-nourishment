import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator.jsx';

export default function App() {
  return (
    <NavigationContainer testID="navigation-container">
      <StackNavigator />
    </NavigationContainer>
  );
}
