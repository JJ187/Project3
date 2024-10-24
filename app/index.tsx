import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/screens/loginPage" />; // Rediriger vers la page de connexion
}

