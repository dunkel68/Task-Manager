import '../../css/components/statsCard.css';

const StatsCard = ({ totalTasks, pendingTasks, completedTasks, highPriorityTasks }) => {
  return (
    <div className="stats-card">
      <h3>Task Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-value">{totalTasks}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{pendingTasks}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{completedTasks}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{highPriorityTasks}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;