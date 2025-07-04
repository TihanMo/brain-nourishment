import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Vibration,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HIGHSCORE_KEY = 'highscore-reaction';

export default function ReactionGame() {
  const navigation = useNavigation();

  const [gameState, setGameState] = useState('waiting'); // waiting | ready | tooSoon | result
  const [message, setMessage] = useState('Tippe den Bildschirm, sobald er grün wird!');
  const [reactionTime, setReactionTime] = useState(null);
  const [highscore, setHighscore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [percentile, setPercentile] = useState(null);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Lade Highscore bei Initialisierung
  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(HIGHSCORE_KEY);
        if (stored) setHighscore(JSON.parse(stored));
      } catch (e) {
        console.error('Fehler beim Laden des Highscores:', e);
      }
    };
    loadHighscore();
  }, []);

  // Startet ein neues Spiel mit zufälliger Verzögerung
  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    setFeedback('');
    setPercentile(null);
    setMessage('Tippe den Bildschirm, sobald er grün wird!');

    const delay = 2000 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      setGameState('ready');
      setMessage('Jetzt tippen!');
    }, delay);
  };

  // Starte Spiel beim ersten Laden
  useEffect(() => {
    startGame();
    return () => clearTimeout(timerRef.current);
  }, []);

  // Starte Zeitmessung exakt beim Rendern von "ready" (grün)
  useEffect(() => {
    if (gameState === 'ready') {
      startTimeRef.current = Date.now();
    }
  }, [gameState]);

  // Spacebar-Tastendruck nur im Web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleKeyDown = (event) => {
        if (event.code === 'Space') {
          event.preventDefault();
          handlePress();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameState]);

  // Nutzer hat den Bildschirm getippt
  const handlePress = async () => {
    if (gameState === 'waiting') {
      clearTimeout(timerRef.current);
      setGameState('tooSoon');
      setMessage('Zu früh! Tippe, um es erneut zu versuchen.');
    } else if (gameState === 'ready') {
      const now = Date.now();
      const duration = now - startTimeRef.current;
      setReactionTime(duration);
      setGameState('result');
      Vibration.vibrate(5);

      const fakePercentile = Math.max(1, Math.min(99, Math.round(100 - (duration - 150) / 3)));
      setPercentile(fakePercentile);

      if (highscore === null || duration < highscore) {
        try {
          await AsyncStorage.setItem(HIGHSCORE_KEY, JSON.stringify(duration));
          setHighscore(duration);
          setFeedback('🎉 Neuer Highscore!');
        } catch (e) {
          console.error('Fehler beim Speichern des Highscores:', e);
        }
      } else {
        setFeedback('👌 Gute Zeit!');
      }
    } else if (gameState === 'tooSoon' || gameState === 'result') {
      startGame();
    }
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'ready':
        return '#4CAF50'; // grün
      case 'tooSoon':
        return '#FF9800'; // orange
      case 'result':
        return '#2196F3'; // blau
      default:
        return '#F44336'; // rot
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
        {gameState === 'result' ? (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>Du hast eine Reaktionszeit von:</Text>
            <Text style={styles.resultTime}>{reactionTime} ms</Text>
            {percentile && (
              <Text style={styles.percentile}>
                Du bist schneller als {percentile}% aller Menschen!
              </Text>
            )}
            <Text style={styles.feedback}>{feedback}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={startGame} style={styles.iconButton}>
                <Ionicons name="refresh" size={28} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={styles.menuButton}
              >
                <Ionicons name="home-outline" size={20} color="#fff" />
                <Text style={styles.menuButtonText}>Zurück zum Menü</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.message}>{message}</Text>
            {gameState === 'tooSoon' && (
              <Text style={styles.feedback}>Tippe, um neu zu starten.</Text>
            )}
            {typeof window !== 'undefined' && (
              <Text style={styles.webHint}>(Tipp: Drücke Leertaste [␣] im Web)</Text>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 32,
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  resultBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  resultLabel: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultTime: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  percentile: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 28,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  iconButton: {
    backgroundColor: '#00000033',
    padding: 14,
    borderRadius: 100,
  },
  menuButton: {
    backgroundColor: '#00000033',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  webHint: {
    marginTop: 10,
    fontSize: 14,
    color: '#ffffffcc',
    textAlign: 'center',
  },
});
