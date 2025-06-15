import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = '/tasks';
      if (filter === 'completed') url += '?status=completed';
      if (filter === 'pending') url += '?status=pending';
      
      const response = await api.get(url);
      return Array.isArray(response.data) ? response.data : [];
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prevTasks => [...prevTasks, {
      ...response.data,
      _id: response.data._id,
      user: response.data.user,
      completed: response.data.completed,
      createdAt: response.data.createdAt
    }]);
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      const response = await api.patch(`/tasks/${id}/toggle`);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const value = {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    refetchTasks: fetchTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};