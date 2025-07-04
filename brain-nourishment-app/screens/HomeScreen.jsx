import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SettingsContext } from '../contexts/SettingsContext.jsx';

import brainIcon from '../assets/brain.png';
import SettingsModal from '../components/SettingsModal';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [settingsVisible, setSettingsVisible] = useState(false);
  const { settings, toggleSetting, theme } = useContext(SettingsContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Settings Icon */}
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setSettingsVisible(true)}
      >
        <Ionicons name="settings-outline" size={28} color={theme.text} />
      </TouchableOpacity>

      {/* Brain Icon */}
      <Image source={brainIcon} style={styles.logo} />

      {/* Title */}
      <Text style={[styles.title, { color: theme.text }] }>
        Brain <Text style={styles.italic}>Nourishment</Text>
      </Text>

      {/* Game Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReactionGameIntro')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Reaction Time</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ColorMatchIntro')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Color Match</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TapTheTargetIntro')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Tap the Target</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Highscores')}
      >
        <Text style={[styles.buttonText, { color: theme.text }]}>Highscores</Text>
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
