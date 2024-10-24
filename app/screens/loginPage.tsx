import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Utilisation de expo-router
import { login } from '../api'; // Appel à l'API

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Remplacement de la navigation

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true); // Indiquer que la requête est en cours
      const response = await login({ email, password });

      if (response.status === 200) {
        Alert.alert('Succès', 'Connexion réussie');
        router.push('/screens/MyTasksPage'); // Redirection avec expo-router
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Erreur', 'Identifiants incorrects');
      } else {
        Alert.alert('Erreur', 'Problème lors de la connexion');
      }
    } finally {
      setLoading(false); // Arrêter l'indicateur de chargement
    }
  };

  const handleSignUpNavigation = () => {
    router.push('/screens/SignUpPage'); // Redirection vers la page d'inscription
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title={loading ? 'Connexion...' : 'Se connecter'} onPress={handleLogin} disabled={loading} />
      
      {/* Lien pour s'inscrire si l'utilisateur n'a pas de compte */}
      <TouchableOpacity onPress={handleSignUpNavigation} style={styles.signUpLink}>
        <Text style={styles.signUpText}>Pas encore inscrit ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  signUpLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
