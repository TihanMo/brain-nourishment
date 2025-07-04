import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ReactionGameIntro from '../screens/ReactionGameIntro';
import ReactionGame from '../games/ReactionGame';
import ColorMatchIntro from '../screens/ColorMatchIntro';
import ColorMatchGame from '../games/ColorMatchGame';
import TapTheTargetIntro from '../screens/TapTheTargetIntro';
import TapTheTargetGame from '../games/TapTheTargetGame';
import Highscores from '../screens/Highscores';
import ReactionInfo from '../screens/ReactionInfo';
import ColorMatchInfo from '../screens/ColorMatchInfo';
import TapTheTargetInfo from '../screens/TapTheTargetInfo';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ReactionGameIntro" component={ReactionGameIntro} options={{ headerShown: false }}/>
      <Stack.Screen name="ReactionGame" component={ReactionGame} options={{ headerShown: false }}/>
      <Stack.Screen name="ColorMatchIntro" component={ColorMatchIntro} options={{ headerShown: false }}/>
      <Stack.Screen name="ColorMatchGame" component={ColorMatchGame} options={{ headerShown: false }}/>
      <Stack.Screen name="TapTheTargetIntro" component={TapTheTargetIntro} options={{ headerShown: false }}/>
      <Stack.Screen name="TapTheTargetGame" component={TapTheTargetGame} options={{ headerShown: false }}/>
      <Stack.Screen name="ReactionInfo" component={ReactionInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="ColorMatchInfo" component={ColorMatchInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="TapTheTargetInfo" component={TapTheTargetInfo} options={{ headerShown: false }}/>
      <Stack.Screen name="Highscores" component={Highscores} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
