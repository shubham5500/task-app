import React from 'react';

const Button = ({ text, onClick, className }) => {
  return (
    <button
      className={`bg-button-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
