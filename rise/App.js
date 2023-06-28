import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import List from './app/screens/List';
import Login from './app/screens/Login';
import Setup from './app/screens/Setup';
import CameraPage from './app/screens/CameraPage';
//import Details from './app/screens/Details';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Setup' component={Setup}/>
        <Stack.Screen name='Camera' component={CameraPage}/>
        <Stack.Screen name='List' component={List}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
