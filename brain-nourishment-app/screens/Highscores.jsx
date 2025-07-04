import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HIGHSCORE_KEYS = [
  {
    key: 'highscore-reaction',
    title: 'Reaction Time',
    emoji: '⚡',
    unit: 'ms',
  },
  {
    key: 'highscore-colormatch',
    title: 'Color Match',
    emoji: '🎨',
    unit: 'Punkte',
  },
  {
    key: 'highscore-tapthetarget',
    title: 'Tap the Target',
    emoji: '🎯',
    unit: 'Punkte',
  },
];

export default function Highscores() {
  const navigation = useNavigation();
  const [scores, setScores] = useState({});

  useEffect(() => {
    const loadScores = async () => {
      const loaded = {};
      for (const item of HIGHSCORE_KEYS) {
        try {
          const stored = await AsyncStorage.getItem(item.key);
          if (stored !== null) {
            loaded[item.key] = JSON.parse(stored);
          } else {
            loaded[item.key] = '—';
          }
        } catch (e) {
          loaded[item.key] = 'Fehler';
        }
      }
      setScores(loaded);
    };

    loadScores();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Zurück zum Menü</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🏆 Highscores</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {HIGHSCORE_KEYS.map(({ key, title, emoji, unit }) => (
          <View key={key} style={styles.item}>
            <Text style={styles.emoji}>{emoji}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.gameTitle}>{title}</Text>
              <Text style={styles.score}>
                {scores[key] !== undefined ? `${scores[key]} ${unit}` : 'Lade...'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  list: {
    paddingBottom: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  emoji: {
    fontSize: 32,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  score: {
    fontSize: 16,
    color: '#555',
  },
});
