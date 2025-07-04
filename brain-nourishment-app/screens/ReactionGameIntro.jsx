import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PreGameScreen from '../components/PreGameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReactionGameIntro() {
  const navigation = useNavigation();

  const [highscore, setHighscore] = useState(null);
  const HIGHSCORE_KEY = 'highscore-reaction';

  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(HIGHSCORE_KEY);
        if (stored) {
          const value = JSON.parse(stored);
          setHighscore(typeof value === 'number' ? value : null);
        } else {
          setHighscore(null);
        }
      } catch (e) {
        console.error('Fehler beim Laden des ReactionTime-Highscores:', e);
      }
    };
    loadHighscore();
  }, []);

  // Text, der an PreGameScreen übergeben wird
  const displayHighscore =
    highscore !== null ? `Highscore: ${highscore} ms` : 'Noch kein Highscore';

  return (
    <PreGameScreen
      icon="⚡️"
      gameTitle="Reaction Time"
      description="Teste, wie schnell du reagieren kannst, wenn der Bildschirm die Farbe wechselt."
      highscoreKey={HIGHSCORE_KEY}
      unit="ms"
      onStart={() => navigation.navigate('ReactionGame')}
      onInfo={() => navigation.navigate('ReactionInfo')}
      onBack={() => navigation.goBack()}
      highscoreLabel={displayHighscore}
    />
  );
}
