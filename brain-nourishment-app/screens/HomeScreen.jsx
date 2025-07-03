import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import brainIcon from '../assets/brain.png';
import SettingsModal from '../components/SettingsModal';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Modal Sichtbarkeit
  const [settingsVisible, setSettingsVisible] = useState(false);

  // Dummy Settings-Zustand
  const [settings, setSettings] = useState({
    darkMode: false,
    sound: true,
    vibration: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Settings Icon (öffnet Modal) */}
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

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReactionGame')}
      >
        <Text style={styles.buttonText}>Reaction Time</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ColorMatch')}
      >
        <Text style={styles.buttonText}>Color Match</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TapTarget')}
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
