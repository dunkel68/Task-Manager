import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import '../../css/components/TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  // Enhanced date formatting
  const formatDueDate = (dateString) => {
    if (!dateString || dateString === '1970-01-01T00:00:00.000Z') {
      return 'No due date';
    }
    try {
      const date = parseISO(dateString);
      return isValid(date) ? format(date, 'MMM dd, yyyy') : 'Invalid date';
    } catch {
      return 'Invalid date';
    }
  };

  // Priority styling
  const getPriorityStyle = () => ({
    backgroundColor: {
      high: '#e74c3c',
      medium: '#f39c12',
      low: '#2ecc71'
    }[task.priority] || '#95a5a6',
    title: `Priority: ${task.priority}`
  });

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
        />
      </div>

      <div className="task-content-wrapper">
        {/* Task Title - Always Visible */}
        <div className="task-title-section">
          <h3 className="task-title">
            {task.title || 'Untitled Task'}
          </h3>
          <div className="task-priority" style={getPriorityStyle()}>
            {task.priority}
          </div>
        </div>

        {/* Task Description - Always Visible */}
        <div className="task-description-section">
          <p className="task-description">
            {task.description || 'No description provided'}
          </p>
        </div>

        {/* Task Metadata */}
        <div className="task-meta-section">
          <div className="task-dates">
            <span className="task-date">
              <i className="far fa-calendar-alt"></i> Due: {formatDueDate(task.dueDate)}
            </span>
            <span className="task-status">
              <i className={`fas ${task.completed ? 'fa-check-circle completed' : 'fa-clock pending'}`}></i>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>

          <div className="task-actions">
            <button onClick={() => onEdit(task)} className="edit-button">
              <i className="fas fa-edit"></i> Edit
            </button>
            <button onClick={() => onDelete(task._id)} className="delete-button">
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;