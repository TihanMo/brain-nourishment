import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PreGameScreen from '../components/PreGameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ColorMatchIntro() {
  const navigation = useNavigation();

  const [highscore, setHighscore] = useState(null);
  const HIGHSCORE_KEY = 'highscore-colormatch';

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
        console.error('Fehler beim Laden des ColorMatch-Highscores:', e);
      }
    };
    loadHighscore();
  }, []);

  const displayHighscore =
    highscore !== null ? `Highscore: ${highscore} Punkte` : 'Noch kein Highscore';

  return (
    <PreGameScreen
      icon="🎨"
      gameTitle="Color Match"
      description="Stimmt die Farbe des Wortes mit seiner Bedeutung überein? Teste deine Reaktionsfähigkeit."
      highscoreKey={HIGHSCORE_KEY}
      onStart={() => navigation.navigate('ColorMatchGame')}
      onInfo={() => navigation.navigate('ColorMatchInfo')}
      onBack={() => navigation.goBack()}
      highscoreLabel={displayHighscore}
    />
  );
}
