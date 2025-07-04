import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

describe('HomeScreen', () => {
  it('shows buttons for each game', () => {
    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    expect(getByText('Reaction Time')).toBeTruthy();
    expect(getByText('Color Match')).toBeTruthy();
    expect(getByText('Tap the Target')).toBeTruthy();
    expect(getByText('Highscores')).toBeTruthy();
  });
});
