import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Add HomePage route */}
      <Stack.Screen name="screens/HomePage" options={{ title: 'Accueil' }} />
      {/* Other routes */}
    </Stack>
  );
}
