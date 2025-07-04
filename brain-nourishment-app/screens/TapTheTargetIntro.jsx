import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PreGameScreen from '../components/PreGameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TapTheTargetIntro() {
  const navigation = useNavigation();

  const [highscore, setHighscore] = useState(null);
  const HIGHSCORE_KEY = 'highscore-tapthetarget';

  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(HIGHSCORE_KEY);
        if (stored) {
          const parsed = parseInt(JSON.parse(stored), 10);
          setHighscore(!isNaN(parsed) ? parsed : null);
        } else {
          setHighscore(null);
        }
      } catch (e) {
        console.error('Fehler beim Laden des TapTheTarget-Highscores:', e);
      }
    };
    loadHighscore();
  }, []);

  const displayHighscore =
    highscore !== null ? `Highscore: ${highscore} Treffer` : 'Noch kein Highscore';

  return (
    <PreGameScreen
      icon="🎯"
      gameTitle="Tap the Target"
      description="Tippe so schnell du kannst auf die Ziele! Die Reaktionszeit wird immer kürzer."
      highscoreLabel={displayHighscore}
      highscoreKey={HIGHSCORE_KEY}
      unit="Punkte"
      onStart={() => navigation.navigate('TapTheTargetGame')}
      onInfo={() => navigation.navigate('TapTheTargetInfo')}
      onBack={() => navigation.goBack()}
    />
  );
}
