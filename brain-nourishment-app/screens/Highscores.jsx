import React, { useEffect, useState, useContext } from 'react';
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
import { SettingsContext } from '../contexts/SettingsContext.jsx';

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
  const { theme } = useContext(SettingsContext);

  useEffect(() => {
    const loadScores = async () => {
      // Load all scores in parallel instead of sequentially
      const promises = HIGHSCORE_KEYS.map(async (item) => {
        try {
          const stored = await AsyncStorage.getItem(item.key);
          return [item.key, stored !== null ? JSON.parse(stored) : '—'];
        } catch (e) {
          return [item.key, 'Fehler'];
        }
      });

      const results = await Promise.all(promises);
      const loaded = Object.fromEntries(results);
      setScores(loaded);
    };

    loadScores();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={theme.text} />
        <Text style={[styles.backText, { color: theme.text }]}>Zurück zum Menü</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.text }]}>🏆 Highscores</Text>
      <ScrollView contentContainerStyle={styles.list}>
        {HIGHSCORE_KEYS.map(({ key, title, emoji, unit }) => (
          <View key={key} style={styles.item}>
            <Text style={styles.emoji}>{emoji}</Text>
            <View style={styles.textContainer}>
              <Text style={[styles.gameTitle, { color: theme.text }]}>{title}</Text>
              <Text style={[styles.score, { color: theme.text }] }>
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
