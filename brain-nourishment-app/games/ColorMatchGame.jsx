import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = [
  { name: 'Rot', color: 'red' },
  { name: 'Blau', color: 'blue' },
  { name: 'Grün', color: 'green' },
  { name: 'Gelb', color: 'gold' },
  { name: 'Schwarz', color: 'black' },
];

const HIGHSCORE_KEY = 'highscore-colormatch';

export default function ColorMatchGame() {
  const navigation = useNavigation();
  const [word, setWord] = useState('');
  const [color, setColor] = useState('');
  const [isMatch, setIsMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const timerRef = useRef(null);

  // Highscore laden
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

  // Spiel starten & Timer
  useEffect(() => {
    generateNewRound();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          checkAndSaveHighscore(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Tasteneingabe (nur Web)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isGameOver || isDisabled) return;
      if (event.key === '1') {
        handleAnswer(false);
      } else if (event.key === '2') {
        handleAnswer(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [isGameOver, isDisabled, isMatch]);

  const checkAndSaveHighscore = async (finalScore) => {
    if (finalScore > (highscore ?? 0)) {
      try {
        await AsyncStorage.setItem(HIGHSCORE_KEY, JSON.stringify(finalScore));
        setHighscore(finalScore);
      } catch (e) {
        console.error('Fehler beim Speichern des Highscores:', e);
      }
    }
  };

  const generateNewRound = () => {
    const wordObj = COLORS[Math.floor(Math.random() * COLORS.length)];
    const match = Math.random() < 0.5;

    let chosenColor;
    if (match) {
      chosenColor = wordObj.color;
    } else {
      const differentColors = COLORS.filter(c => c.color !== wordObj.color);
      const randomWrong = differentColors[Math.floor(Math.random() * differentColors.length)];
      chosenColor = randomWrong.color;
    }

    setWord(wordObj.name);
    setColor(chosenColor);
    setIsMatch(match);
  };

  const handleAnswer = (answerIsMatch) => {
    if (isGameOver || isDisabled) return;

    const correct = answerIsMatch === isMatch;

    if (correct) {
      setFeedback('✅ Richtig!');
      setScore((prev) => prev + 1);
      generateNewRound();
    } else {
      Vibration.vibrate(30);
      setFeedback('❌ Falsch!');
      setIsDisabled(true);
      timerRef.current = setTimeout(() => {
        setIsDisabled(false);
        setFeedback(null);
        generateNewRound();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color Match</Text>
      <Text style={styles.timer}>Zeit: {timeLeft}s</Text>

      {/* Menübutton (immer sichtbar) */}
      {!isGameOver && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#000" />
          <Text style={styles.backButtonText}>Zurück</Text>
        </TouchableOpacity>
      )}

      <View style={styles.centerBox}>
        {isGameOver ? (
          <>
            <Text style={styles.result}>Zeit vorbei!</Text>
            <Text style={styles.result}>Dein Score: {score}</Text>
            <Text style={styles.highscore}>
              {highscore !== null ? `Highscore: ${highscore}` : 'Noch kein Highscore'}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Ionicons name="home-outline" size={20} color="#fff" />
              <Text style={styles.buttonTextWhite}>Zurück zum Menü</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.word, { color }]}>{word}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, isDisabled && styles.disabledButton]}
                onPress={() => handleAnswer(false)}
                disabled={isDisabled}
              >
                <Text style={styles.buttonTextWhite}>Falsch</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, isDisabled && styles.disabledButton]}
                onPress={() => handleAnswer(true)}
                disabled={isDisabled}
              >
                <Text style={styles.buttonTextWhite}>Richtig</Text>
              </TouchableOpacity>
            </View>
            {feedback && <Text style={styles.feedback}>{feedback}</Text>}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  timer: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#444',
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 32,
    paddingHorizontal: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextWhite: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  feedback: {
    fontSize: 20,
    marginTop: 12,
    color: '#333',
    textAlign: 'center',
  },
  result: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 10,
    color: '#111',
    textAlign: 'center',
  },
  highscore: {
    fontSize: 18,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#000',
  },
});
