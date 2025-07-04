import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { SettingsContext } from '../contexts/SettingsContext.jsx';
import { beepBase64 } from '../assets/beepBase64.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
const HIGHSCORE_KEY = 'highscore-tapthetarget';

export default function TapTheTargetGame() {
  const navigation = useNavigation();
  const { settings } = useContext(SettingsContext);
  const soundRef = useRef(null);

  const [targetPosition, setTargetPosition] = useState({ x: 100, y: 100 });
  const [score, setScore] = useState(0);
  const [timeoutDuration, setTimeoutDuration] = useState(3000); // Start bei 3 Sekunden
  const [gameOver, setGameOver] = useState(false);
  const [highscore, setHighscore] = useState(null);
  const timeoutRef = useRef(null);
  const MIN_TIMEOUT = 800;
  const REDUCTION_RATE = 0.94;

  useEffect(() => {
    const loadSound = async () => {
      soundRef.current = new Audio.Sound();
      try {
        await soundRef.current.loadAsync({
          uri: `data:audio/wav;base64,${beepBase64}`,
        });
      } catch (e) {
        console.error('Fehler beim Laden des Sounds:', e);
      }
    };
    loadSound();
    return () => {
      soundRef.current && soundRef.current.unloadAsync();
    };
  }, []);

  // Highscore laden
  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(HIGHSCORE_KEY);
        if (stored) setHighscore(JSON.parse(stored));
      } catch (e) {
        console.error('Fehler beim Laden des TapTheTarget-Highscores:', e);
      }
    };
    loadHighscore();
  }, []);

  // Neue Runde starten
  useEffect(() => {
    if (!gameOver) {
      startNewRound();
    }

    return () => clearTimeout(timeoutRef.current);
  }, [gameOver]);

  // Highscore aktualisieren bei Game Over
  useEffect(() => {
    if (gameOver) checkAndSaveHighscore(score);
  }, [gameOver]);

  const startNewRound = () => {
    const newX = Math.random() * (width - 100);
    const newY = Math.random() * (height - 200) + 100;
    setTargetPosition({ x: newX, y: newY });

    timeoutRef.current = setTimeout(() => {
      if (settings.vibration) {
        Vibration.vibrate(200);
      }
      setGameOver(true);
    }, timeoutDuration);
  };

    const handlePress = () => {
    if (gameOver) return;

    clearTimeout(timeoutRef.current);
    setScore((prev) => prev + 1);

    if (settings.sound && soundRef.current) {
      soundRef.current.replayAsync().catch(() => {});
    }

    // Optional: Weichere Schwierigkeitssteigerung ab Score 15
    setTimeoutDuration((prev) => {
        if (score < 10) {
        return Math.max(MIN_TIMEOUT, prev * REDUCTION_RATE);
        } else if (score < 20) {
        return Math.max(MIN_TIMEOUT, prev - 100);
        } else {
        return MIN_TIMEOUT; // ab Score 20 bleibt es konstant
        }
    });

    startNewRound();
    };


  const checkAndSaveHighscore = async (currentScore) => {
    if (currentScore > (highscore ?? 0)) {
      try {
        await AsyncStorage.setItem(HIGHSCORE_KEY, JSON.stringify(currentScore));
        setHighscore(currentScore);
      } catch (e) {
        console.error('Fehler beim Speichern des Highscores:', e);
      }
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTimeoutDuration(3000);
    setGameOver(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {highscore !== null && <Text style={styles.highscore}>Highscore: {highscore}</Text>}

      {!gameOver && (
        <TouchableOpacity
          style={[styles.target, { top: targetPosition.y, left: targetPosition.x }]}
          onPress={handlePress}
        />
      )}

      {gameOver && (
        <View style={styles.centered}>
          <Text style={styles.gameOver}>Game Over</Text>
          <Text style={styles.result}>Dein Score: {score}</Text>
          <Text style={styles.result}>
            {highscore !== null ? `Highscore: ${highscore}` : 'Noch kein Highscore'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Nochmal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Zurück zum Menü</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
  },
  highscore: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  target: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOver: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
