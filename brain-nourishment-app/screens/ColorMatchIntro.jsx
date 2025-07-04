import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import PreGameScreen from '../components/PreGameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGHSCORE_KEY = 'highscore-colormatch';

export default function ColorMatchIntro() {
  const navigation = useNavigation();
  const [highscore, setHighscore] = useState(null);

  useEffect(() => {
    const loadHighscore = async () => {
      try {
        const stored = await AsyncStorage.getItem(HIGHSCORE_KEY);
        const parsed = parseInt(JSON.parse(stored), 10);
        setHighscore(!isNaN(parsed) ? parsed : null);
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
      highscoreLabel={displayHighscore}
      onStart={() => navigation.navigate('ColorMatchGame')}
      onInfo={() => navigation.navigate('ColorMatchInfo')}
      onBack={() => navigation.goBack()}
    />
  );
}
