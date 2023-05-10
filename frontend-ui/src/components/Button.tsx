import React from 'react';

const Button = ({ text, className, ...props }) => {
  return (
    <button
      className={`bg-button-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
