import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from "firebase/auth";
import List from './app/screens/List';
import Login from './app/screens/Login';
import Setup from './app/screens/Setup';
import CameraPage from './app/screens/CameraPage';
import FitnessSetup from './app/screens/FitnessSetup';
import CameraSetupInfo from './app/screens/CameraSetupInfo';
import Home from './app/screens/Home';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import CreateAccount from './app/screens/CreateAccount';
//import Details from './app/screens/Details';

const Stack = createNativeStackNavigator();
export default function App() {
  
  const [authenticated, setAuthenticated] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Login")
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setAuthenticated(true);
        setInitialRoute('Setup');
      } else {
        // User is signed out
        setAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Create Account' component={CreateAccount} options={{headerShown: false}}/>
        <Stack.Screen name='Setup' component={Setup} options={{headerShown: false}}/>
        <Stack.Screen name='Camera' component={CameraPage} options={{headerShown: false}}/>
        <Stack.Screen name='FitnessSetup' component={FitnessSetup} options={{headerShown: false}}/>
        <Stack.Screen name='CameraSetupInfo' component={CameraSetupInfo} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='List' component={List} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
