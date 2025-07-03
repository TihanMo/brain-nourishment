import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ReactionGameIntro from '../screens/ReactionGameIntro';
import ReactionGame from '../games/ReactionGame';
import ColorMatchIntro from '../screens/ColorMatchIntro';
import ColorMatchGame from '../games/ColorMatchGame';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ReactionGameIntro" component={ReactionGameIntro} />
      <Stack.Screen name="ReactionGame" component={ReactionGame} options={{ headerShown: false }}/>
      <Stack.Screen name="ColorMatchIntro" component={ColorMatchIntro} />
      <Stack.Screen name="ColorMatchGame" component={ColorMatchGame} options={{ headerShown: false }}/>

    </Stack.Navigator>
  );
}
