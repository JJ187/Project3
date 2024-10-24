import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTasksScreen from './mytaskpage'; // Import your screens
import ArchivedTasksScreen from './archivetaskpage';
import OtherTasksScreen from './othertaskpage';
import { useRouter } from 'expo-router';

const Tab = createBottomTabNavigator();

const HomePage = ({ route }: any) => {
  const { userId } = route.params; // Retrieve userId passed from login
  const router = useRouter();

  return (
    <Tab.Navigator initialRouteName="MyTasks">
      <Tab.Screen
        name="MyTasks"
        options={{ title: 'Mes Tâches' }}
      >
        {(props) => <MyTasksScreen {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen
        name="ArchivedTasks"
        options={{ title: 'Tâches Archivées' }}
      >
        {(props) => <ArchivedTasksScreen {...props} userId={userId} />}
      </Tab.Screen>
      <Tab.Screen
        name="OtherTasks"
        options={{ title: 'Tâches des Autres' }}
      >
        {(props) => <OtherTasksScreen {...props} userId={userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomePage;
