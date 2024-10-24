import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button } from 'react-native';
import { getTasks } from '../api'; 
import { useRouter } from 'expo-router'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const OtherTasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchUserIdAndTasks = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          const response = await getTasks(storedUserId);
          const otherUsersTasks = response.data.tasks.filter((task: Task) => task.ownerId !== storedUserId);
          setTasks(otherUsersTasks);
        } else {
          Alert.alert('Erreur', 'Utilisateur non connecté');
        }
      } catch (error) {
        console.error('Failed to fetch tasks', error);
        Alert.alert('Erreur', 'Impossible de récupérer les tâches');
      }
    };

    fetchUserIdAndTasks();
  }, []);

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
