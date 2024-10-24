import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Import router and params for navigation

// Task model type
export type Task = {
  taskId: string;
  ownerId: string;
  firstName?: string;  // Optional, only visible in "Other Tasks"
  lastName?: string;   // Optional, only visible in "Other Tasks"
  title: string;
  description: string;
  isDone: boolean;
  date: string;
  isOwner: boolean;    // Indicates if the current user owns this task
};

const TaskDetailsPage = () => {
  const router = useRouter();
  const { taskId, title, description, isDone, date, firstName, lastName, isOwner } = useLocalSearchParams<Task>(); // Get the task details passed via params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.info}>Status: {isDone ? 'Completed' : 'Active'}</Text>
      <Text style={styles.info}>Created on: {new Date(date).toLocaleDateString()}</Text>

      {/* Only show owner's name if the task is from "Other Tasks" */}
      {!isOwner && firstName && lastName && (
        <Text style={styles.info}>Owner: {firstName} {lastName}</Text>
      )}

      {/* Back button to navigate to the previous page */}
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default TaskDetailsPage;
