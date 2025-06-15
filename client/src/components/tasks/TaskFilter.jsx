import '../../css/components/task-filter.css';

const TaskFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-controls">
      <label>Filter:</label>
      <select
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

const getFilteredTasks = () => {
  if (filter === 'completed') return tasks.filter(task => task.completed);
  if (filter === 'pending') return tasks.filter(task => !task.completed);
  return tasks;
};

export default TaskFilter;