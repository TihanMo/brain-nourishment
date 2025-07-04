import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App.js', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    // NavigationContainer rendert StackNavigator korrekt → keine Fehler
    expect(getByTestId('navigation-container')).toBeTruthy();
  });
});
