import React from 'react';

const base = 'w-full py-2 rounded font-semibold transition focus:outline-none';
const variants = {
  primary: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-blue-600 hover:to-cyan-500',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  social: 'flex items-center justify-center space-x-2',
};

const Button = ({ children, type = 'button', onClick, className = '', variant = 'primary', ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`${base} ${variants[variant] || ''} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 