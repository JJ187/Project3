import axios from 'axios';

const API_BASE_URL = 'https://server-1-t93s.onrender.com';

// API pour l'inscription
export const signUp = (userData: { firstName: string, lastName: string, email: string, password: string }) => {
  return axios.post(`${API_BASE_URL}/api/user/signup`, userData);
};

// API pour la connexion
export const login = (credentials: { email: string, password: string }) => {
  return axios.post(`${API_BASE_URL}/api/user/login`, credentials);
};

// API pour récupérer les tâches d'un utilisateur
export const getTasks = (userId: string) => {
  return axios.get(`${API_BASE_URL}/api/tasks-management/get-tasks/${userId}?isDone=false`);
};

// API pour mettre à jour une tâche
export const updateTask = (taskId: string, taskData: { title?: string, description?: string, isDone?: boolean }) => {
  return axios.put(`${API_BASE_URL}/api/tasks-management/update-task/${taskId}`, taskData);
};
