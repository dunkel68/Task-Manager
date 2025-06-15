import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import '../../css/components/TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  // Safe date formatting function
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    
    try {
      // Try parsing as ISO string first
      const date = parseISO(dateString);
      if (isValid(date)) return format(date, 'MMM dd, yyyy');
      
      // Fallback to Date constructor if parseISO fails
      const fallbackDate = new Date(dateString);
      return isValid(fallbackDate) 
        ? format(fallbackDate, 'MMM dd, yyyy') 
        : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-date">
        Due: {formatDate(task.dueDate)}
      </span>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />
      </div>
      <div className="task-content">
        <div className="task-header">
          <h3>{task.title}</h3>
          <div className="task-priority" style={{ backgroundColor: getPriorityColor() }}>
            {task.priority}
          </div>
        </div>
        {task.description && <p className="task-description">{task.description}</p>}
        <div className="task-footer">
          <span className="task-date">
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </span>
          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="edit-button">
              <i className="fas fa-edit"></i>
            </button>
            <button onClick={() => onDelete(task._id)} className="delete-button">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;