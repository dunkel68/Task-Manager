import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
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
      if (filter === 'completed') url += '?completed=true';
      if (filter === 'pending') url += '?completed=false';
      
      const response = await api.get(url);
      
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid tasks data format');
      }
      
      const normalizedTasks = response.data.map(task => ({
        ...task,
        id: task._id || task.id, // Handle both _id (MongoDB) and id
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        createdAt: task.createdAt ? new Date(task.createdAt) : new Date()
      }));
      
      setTasks(normalizedTasks);
      return normalizedTasks;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to fetch tasks';
      setError(errorMessage);
      console.error('Fetch tasks error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };
  
  const tempId = Date.now().toString();

  const createTask = async (taskData) => {
    try {
      // Basic validation
      if (!taskData.title) {
        throw new Error('Task title is required');
      }

      // Optimistic update
      const newTask = {
        ...taskData,
        id: tempId,
        completed: false,
        createdAt: new Date()
      };
      
      setTasks(prev => [...prev, newTask]);
      
      const response = await api.post('/tasks', taskData);
      
      // Replace temporary task with server response
      const createdTask = {
        ...response.data,
        id: response.data._id || response.data.id,
        dueDate: response.data.dueDate ? new Date(response.data.dueDate) : null
      };
      
      setTasks(prev => 
        prev.map(task => task.id === tempId ? createdTask : task)
      );
      
      return createdTask;
    } catch (err) {
      // Rollback optimistic update
      setTasks(prev => prev.filter(task => task.id !== tempId));
      
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to create task';
      setError(errorMessage);
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      if (!id) throw new Error('Task ID is required');
      
      // Optimistic update
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, ...taskData } : task
        )
      );
      
      const response = await api.put(`/tasks/${id}`, taskData);
      
      const updatedTask = {
        ...response.data,
        id: response.data._id || response.data.id,
        dueDate: response.data.dueDate ? new Date(response.data.dueDate) : null
      };
      
      setTasks(prev => 
        prev.map(task => task.id === id ? updatedTask : task)
      );
      
      return updatedTask;
    } catch (err) {
      // Re-fetch to revert optimistic update
      await fetchTasks();
      
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to update task';
      setError(errorMessage);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      if (!id) throw new Error('Task ID is required');
      
      // Optimistic update
      setTasks(prev => prev.filter(task => task.id !== id));
      
      await api.delete(`/tasks/${id}`);
      
      return true;
    } catch (err) {
      // Re-fetch to revert optimistic update
      await fetchTasks();
      
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to delete task';
      setError(errorMessage);
      throw err;
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      if (!id) throw new Error('Task ID is required');
      
      const taskToToggle = tasks.find(task => task.id === id);
      if (!taskToToggle) throw new Error('Task not found');
      
      // Optimistic update
      setTasks(prev => 
        prev.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      
      const response = await api.patch(`/tasks/${id}/toggle`);
      
      const toggledTask = {
        ...response.data,
        id: response.data._id || response.data.id,
        dueDate: response.data.dueDate ? new Date(response.data.dueDate) : null
      };
      
      setTasks(prev => 
        prev.map(task => task.id === id ? toggledTask : task)
      );
      
      return toggledTask;
    } catch (err) {
      // Re-fetch to revert optimistic update
      await fetchTasks();
      
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Failed to toggle task status';
      setError(errorMessage);
      throw err;
    }
  };

  // Initial fetch and when filter changes
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
    clearError: () => setError(null)
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};