import React, { useState } from 'react';
import { parseISO, isValid } from 'date-fns';
import '../../css/components/TaskForm.css';

const TaskForm = ({ onSubmit, initialData = {} }) => {
  const [task, setTask] = useState({
    dueDate: initialData.dueDate && isValid(new Date(initialData.dueDate)) 
      ? initialData.dueDate 
      : '',
    description: initialData.description || '',
    dueDate: initialData.dueDate || '',
    priority: initialData.priority || 'medium',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!task.title.trim()) newErrors.title = 'Title is required';
    if (!task.dueDate) newErrors.dueDate = 'Due date is required';
    return newErrors;
  };

  const validateDueDate = (dateString) => {
    if (!dateString) return false;
    try {
      return isValid(parseISO(dateString)) || isValid(new Date(dateString));
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.dueDate && !isValid(new Date(task.dueDate))) {
      alert('Please enter a valid due date');
      return;
    }
    onSubmit(task);
    setTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate">Due Date*</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate || ''}
            onChange={(e) => setTask({...task, dueDate: e.target.value || null})}
            min={new Date().toISOString().split('T')[0]} // Optional: prevent past dates
            className={errors.dueDate ? 'error' : ''}
          />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <button type="submit" className="submit-button">
        {initialData._id ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;