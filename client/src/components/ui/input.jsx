// src/components/ui/Input.jsx
import '../../css/components/input.css';

const Input = ({ label, id, className = '', ...props }) => {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        className={`input-field ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;