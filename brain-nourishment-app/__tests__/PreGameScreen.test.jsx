import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PreGameScreen from '../components/PreGameScreen';

const props = {
  icon: '⚡',
  gameTitle: 'Test Game',
  description: 'desc',
  highscoreKey: 'hs-key',
  onStart: jest.fn(),
  onInfo: jest.fn(),
  onBack: jest.fn(),
};

describe('PreGameScreen', () => {
  it('renders title and calls callbacks', () => {
    const { getByText } = render(<PreGameScreen {...props} />);
    expect(getByText('Test Game')).toBeTruthy();

    fireEvent.press(getByText('Start'));
    expect(props.onStart).toHaveBeenCalled();

    fireEvent.press(getByText('information-circle-outline'));
    expect(props.onInfo).toHaveBeenCalled();
  });
});
