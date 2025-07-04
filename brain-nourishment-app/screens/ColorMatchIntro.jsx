import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PreGameScreen from '../components/PreGameScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGHSCORE_KEY = 'highscore-colormatch';

export default function ColorMatchIntro() {
  const navigation = useNavigation();

  return (
    <PreGameScreen
      icon="🎨"
      gameTitle="Color Match"
      description="Stimmt die Farbe des Wortes mit seiner Bedeutung überein? Teste deine Reaktionsfähigkeit."
      highscoreKey={HIGHSCORE_KEY}
      unit="Punkte"
      onStart={() => navigation.navigate('ColorMatchGame')}
      onInfo={() => navigation.navigate('ColorMatchInfo')}
      onBack={() => navigation.goBack()}
    />
  );
}
