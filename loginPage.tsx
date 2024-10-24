import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; 
import { login } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      const response = await login({ email, password });

      if (response.status === 200) {
        const userId = response.data.userId; // Assuming the response has a userId

        // Store userId in AsyncStorage
        await AsyncStorage.setItem('userId', userId);

        // Redirect to the HomePage
        router.push('/screens/HomePage');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Erreur', 'Identifiants incorrects');
      } else {
        Alert.alert('Erreur', 'Problème lors de la connexion');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpNavigation = () => {
    router.push('/screens/SignUpPage');
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
