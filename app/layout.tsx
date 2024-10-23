import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/SignUpPage'; // Ajuste le chemin selon ton projet
import Login from './screens/loginPage.tsx';   // Ajuste le chemin selon ton projet

// Définir les types pour les routes
type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
};

// Créer la stack navigator avec typage
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Layout() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


