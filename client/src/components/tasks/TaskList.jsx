import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import '../../css/components/TaskList.css';
import PropTypes from 'prop-types';

const TaskList = ({ onEdit, onDelete, onToggle }) => {
  const { tasks, loading, filter } = useTasks();
  
  // Safely handle tasks array and filtering
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const filteredTasks = safeTasks.filter(task => {
    if (!task) return false;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  // Empty states
  if (safeTasks.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-tasks"></i>
        <p>No tasks have been created yet</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'completed'
          ? 'No completed tasks'
          : filter === 'pending'
          ? 'No pending tasks'
          : 'No tasks found'}
      </div>
    );
  }

  // Render task list
  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}  // Using the normalized id field
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
          onToggle={() => onToggle(task.id)}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default TaskList;