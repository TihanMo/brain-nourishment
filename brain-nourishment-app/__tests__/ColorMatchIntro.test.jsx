import React from 'react';
import { render } from '@testing-library/react-native';
import ColorMatchIntro from '../screens/ColorMatchIntro';
import { NavigationContainer } from '@react-navigation/native';

describe('ColorMatchIntro', () => {
  it('renders intro screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <ColorMatchIntro />
      </NavigationContainer>
    );
    expect(getByText('Color Match')).toBeTruthy();
    expect(getByText('Start')).toBeTruthy();
  });
});
