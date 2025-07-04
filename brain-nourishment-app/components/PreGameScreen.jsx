import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '../contexts/SettingsContext.jsx';

export default function PreGameScreen({
  icon,
  gameTitle,
  description,
  highscoreKey,
  onStart,
  onInfo,
  onBack,
  unit = '', // neu: Einheit, z. B. "ms", "Punkte", "" (default)
}) {
  const [highscore, setHighscore] = useState(null);
  const { theme } = useContext(SettingsContext);

  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(highscoreKey);
        if (stored) setHighscore(JSON.parse(stored));
      } catch (e) {
        console.error('Fehler beim Laden des Highscores:', e);
      }
    };
    loadHighscore();
  }, [highscoreKey]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Zurück-Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Zurück zum Menü</Text>
      </TouchableOpacity>

      {/* Icon & Titel */}
      <Text style={[styles.icon, { color: theme.text }]}>{icon}</Text>
      <Text style={[styles.title, { color: theme.text }]}>{gameTitle}</Text>
      <Text style={[styles.description, { color: theme.text }]}>{description}</Text>

      {/* Start & Info Button */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton} onPress={onInfo}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      {/* Highscore */}
      {highscore !== null && (
        <Text style={[styles.highscore, { color: theme.text }]}>Highscore: {highscore} {unit}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
  },
  icon: {
    fontSize: 40,
    marginVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  startButton: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 2,
    marginRight: 10,
  },
  infoButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 12,
    borderColor: '#333',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  highscore: {
    marginTop: 30,
    fontSize: 16,
    fontWeight: '600',
  },
});
