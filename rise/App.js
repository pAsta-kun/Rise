import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from "firebase/auth";
import List from './app/screens/List';
import Login from './app/screens/Login';
import Setup from './app/screens/Setup';
import CameraPage from './app/screens/CameraPage';
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
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Create Account' component={CreateAccount}/>
        <Stack.Screen name='Setup' component={Setup}/>
        <Stack.Screen name='Camera' component={CameraPage}/>
        <Stack.Screen name='List' component={List}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
