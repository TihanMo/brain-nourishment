import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

const SETTINGS_KEY = 'brain-nourishment-settings';

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    darkMode: false,
    sound: true,
    vibration: true,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored) setSettings(JSON.parse(stored));
      } catch (e) {
        console.error('Fehler beim Laden der Settings:', e);
      }
    };
    load();
  }, []);

  const toggleSetting = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated)).catch((e) =>
        console.error('Fehler beim Speichern der Settings:', e)
      );
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}
