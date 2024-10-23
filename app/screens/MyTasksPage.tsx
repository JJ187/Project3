import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Task } from '../models/taches';

type Props = {
  userId: string;
};

const MyTasksScreen = ({ userId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/tasks-management/get-tasks/${userId}?isDone=false`);
        setTasks(response.data.tasks); // Assuming the response contains a "tasks" array
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
