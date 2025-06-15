// src/components/ui/Button.jsx
import '../../css/components/button.css';

const Button = ({ children, className = '', disabled = false, ...props }) => {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;