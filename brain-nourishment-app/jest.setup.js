import '@testing-library/jest-native/extend-expect';

// Simple mock for Ionicons to avoid loading native modules
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  return {
    Ionicons: (props) => {
      return React.createElement('Icon', props, props.name || 'icon');
    },
  };
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));
