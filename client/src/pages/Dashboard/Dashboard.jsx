import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTasks } from '../../context/TaskContext';
import Header from './Header';
import Sidebar from './Sidebar';
import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';
import '../../css/pages/Dashboard.css';

const Dashboard = () => {
  const { 
    tasks, 
    loading, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleTaskStatus,
    setFilter 
  } = useTasks();
  const [editingTask, setEditingTask] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <TaskForm 
            onSubmit={handleSubmit} 
            initialData={editingTask || {}} 
          />
          <TaskList 
            tasks={tasks || []} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onToggle={toggleTaskStatus}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;