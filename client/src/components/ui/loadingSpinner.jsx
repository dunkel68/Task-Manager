import '../../css/components/loadingSpinner.css';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div className={`loading-spinner ${fullPage ? 'full-page' : ''}`}>
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;