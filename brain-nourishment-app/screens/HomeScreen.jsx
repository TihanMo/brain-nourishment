import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import brainIcon from '../assets/brain.png';
import SettingsModal from '../components/SettingsModal';

const SETTINGS_KEY = 'brain-nourishment-settings';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [settingsVisible, setSettingsVisible] = useState(false);

  const [settings, setSettings] = useState({
    darkMode: false,
    sound: true,
    vibration: true,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem(SETTINGS_KEY);
        if (stored) {
          setSettings(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Fehler beim Laden der Settings:', e);
      }
    };
    loadSettings();
  }, []);

  const toggleSetting = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      {/* Settings Icon */}
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setSettingsVisible(true)}
      >
        <Ionicons name="settings-outline" size={28} color="#333" />
      </TouchableOpacity>

      {/* Brain Icon */}
      <Image source={brainIcon} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>
        Brain <Text style={styles.italic}>Nourishment</Text>
      </Text>

      {/* Game Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReactionGameIntro')}
      >
        <Text style={styles.buttonText}>Reaction Time</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ColorMatchIntro')}
      >
        <Text style={styles.buttonText}>Color Match</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TapTheTargetIntro')}
      >
        <Text style={styles.buttonText}>Tap the Target</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Highscores')}
      >
        <Text style={styles.buttonText}>Highscores</Text>
      </TouchableOpacity>

      {/* Settings Modal */}
      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        settings={settings}
        onToggle={toggleSetting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  settingsIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  italic: {
    fontStyle: 'italic',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#eee',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
