import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PreGameScreen({
  icon,
  gameTitle,
  description,
  onStart,
  onInfo,
  onBack,
  highscoreKey,
  unit = '', // <- neu: Einheit (z.B. "ms", "Punkte")
}) {
  const [highscore, setHighscore] = useState(null);

  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(highscoreKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (typeof parsed === 'number') {
            setHighscore(parsed);
          }
        }
      } catch (e) {
        console.error('Fehler beim Laden des Highscores:', e);
      }
    };

    if (highscoreKey) {
      loadHighscore();
    }
  }, [highscoreKey]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Zurück zum Menü</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{gameTitle}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.startButton} onPress={onStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoButton} onPress={onInfo}>
            <Ionicons name="information-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {highscore !== null && (
          <Text style={styles.highscore}>
            Highscore: {highscore} {unit}
          </Text>
        )}
      </View>
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
