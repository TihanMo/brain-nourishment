import React from 'react';
import { render } from '@testing-library/react-native';
import ReactionGameIntro from '../screens/ReactionGameIntro';
import { NavigationContainer } from '@react-navigation/native';

describe('ReactionGameIntro', () => {
  it('renders intro screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ReactionGameIntro />
      </NavigationContainer>
    );
    expect(getByText('Reaction Time')).toBeTruthy();
    expect(getByText('Start')).toBeTruthy();
  });
});
