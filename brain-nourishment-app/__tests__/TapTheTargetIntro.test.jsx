import React from 'react';
import { render } from '@testing-library/react-native';
import TapTheTargetIntro from '../screens/TapTheTargetIntro';
import { NavigationContainer } from '@react-navigation/native';

describe('TapTheTargetIntro', () => {
  it('renders intro screen', () => {
    const { getByText } = render(
      <NavigationContainer>
        <TapTheTargetIntro />
      </NavigationContainer>
    );
    expect(getByText('Tap the Target')).toBeTruthy();
    expect(getByText('Start')).toBeTruthy();
  });
});
