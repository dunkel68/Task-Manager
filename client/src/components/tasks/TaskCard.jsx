import { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import '../../css/components/task-card.css';

const TaskCard = ({ task, onUpdate }) => {
  const { updateTask, deleteTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState({ ...task });

  const handleStatusToggle = async () => {
    await updateTask(task._id, {
      status: task.status === 'completed' ? 'pending' : 'completed'
    });
    onUpdate();
  };

  const handleUpdate = async () => {
    await updateTask(task._id, taskData);
    setIsEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task._id);
      onUpdate();
    }
  };

  return (
    <div className={`task-card ${task.status}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={taskData.title}
            onChange={(e) => setTaskData({...taskData, title: e.target.value})}
            className="edit-input"
          />
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({...taskData, description: e.target.value})}
            className="edit-input"
          />
          <div className="edit-actions">
            <button onClick={handleUpdate} className="save-btn">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.title}</h3>
            <span className={`priority ${task.priority}`}>
              {task.priority}
            </span>
          </div>
          <p className="task-description">{task.description}</p>
          {task.dueDate && (
            <p className="due-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
          <div className="task-actions">
            <button 
              onClick={handleStatusToggle}
              className={`status-btn ${task.status}`}
            >
              {task.status === 'completed' ? '✓ Completed' : 'Mark Complete'}
            </button>
            <div className="action-buttons">
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;