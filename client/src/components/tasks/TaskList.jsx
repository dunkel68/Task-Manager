import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import '../../css/components/TaskList.css';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onEdit, onDelete, onToggle, loading }) => {
  const { filter } = useTasks(); // Get current filter
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });
  
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (safeTasks.length === 0) {
    return <div className="empty-state">No tasks have been created yet.</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-tasks"></i>
        <p>No tasks found</p>
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'completed'
          ? 'No completed tasks'
          : 'No pending tasks'}
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem key={task._id} task={task} />
      ))}
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      dueDate: PropTypes.string,
      priority: PropTypes.string
    })
  )
};

TaskList.defaultProps = {
  tasks: []
};

export default TaskList;