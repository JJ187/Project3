import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import { getTasks } from '../api'; // Fonction d'API pour récupérer les tâches
import { useRouter } from 'expo-router'; // Utilisation de expo-router

type Task = {
  taskId: string;
  ownerId: string;
  title: string;
  description: string;
  isDone: boolean;
  date: string;
  firstName?: string;
  lastName?: string;
};

const ArchivedTasksScreen = ({ userId }: { userId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter(); // Utilisation de router pour la navigation

  useEffect(() => {
    const fetchArchivedTasks = async () => {
      try {
        const response = await getTasks(userId); // Modifier pour filtrer les tâches archivées
        const archivedTasks = response.data.tasks.filter((task: Task) => task.isDone);
        setTasks(archivedTasks); // On récupère les tâches archivées
      } catch (error) {
        console.error('Failed to fetch archived tasks', error);
        Alert.alert('Erreur', 'Impossible de récupérer les tâches archivées');
      }
    };

    fetchArchivedTasks();
  }, [userId]);

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Propriétaire: {item.firstName} {item.lastName}</Text>
      <Text>Créé le: {item.date}</Text>
      <Button
        title="Voir détails"
        onPress={() => router.push({ pathname: '/screens/TaskDetailsPage', params: { taskId: item.taskId } })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Aucune tâche archivée</Text>}
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

export default ArchivedTasksScreen;

