import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import { getTasks } from '../api'; // Import de la fonction d'API
import { useRouter } from 'expo-router'; // Utilisation de useRouter pour la navigation

type Task = {
  taskId: string;
  ownerId: string;
  title: string;
  description: string;
  isDone: boolean;
  date: string;
};

type Props = {
  userId: string;
};

const MyTasksScreen = ({ userId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter(); // Utilisation de useRouter pour naviguer

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(userId);
        setTasks(response.data.tasks); // On suppose que la réponse contient un tableau "tasks"
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        Alert.alert('Erreur', 'Impossible de récupérer les tâches');
      }
    };

    fetchTasks();
  }, [userId]);

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Créé le: {item.date}</Text>
      <Button title="Voir détails" onPress={() => router.push(`/screens/TaskDetailsPage?taskId=${item.taskId}`)} />
      {/* Cette ligne redirige vers une page de détails, à adapter selon ton projet */}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Aucune tâche à afficher</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  taskContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  taskTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
});

export default MyTasksScreen;

