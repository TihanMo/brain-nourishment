import React from 'react';
import { render } from '@testing-library/react-native';
import Highscores from '../screens/Highscores';
import { NavigationContainer } from '@react-navigation/native';

describe('Highscores', () => {
  it('renders list titles', () => {
    const { getByText } = render(
      <NavigationContainer>
        <Highscores />
      </NavigationContainer>
    );
    expect(getByText('Reaction Time')).toBeTruthy();
    expect(getByText('Color Match')).toBeTruthy();
    expect(getByText('Tap the Target')).toBeTruthy();
  });
});
