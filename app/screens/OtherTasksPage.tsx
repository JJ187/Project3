import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Task } from '../models/taches';

type Props = {
  userId: string;
};

const OtherTasksScreen = ({ userId }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/tasks-management/get-tasks/${userId}?isDone=false`);
        const otherUsersTasks = response.data.tasks.filter((task: Task) => task.ownerId !== userId);
        setTasks(otherUsersTasks);
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
      <Text>Propriétaire: {item.firstName} {item.lastName}</Text>
      <Text>Créé le: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Aucune tâche des autres utilisateurs</Text>}
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

export default OtherTasksScreen;
