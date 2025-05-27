import React from 'react';

const Input = ({ type = 'text', name, value, onChange, placeholder, icon, ...props }) => (
  <div className="relative mb-4">
    {icon && (
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
    )}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900 ${icon ? 'pl-10' : ''}`}
      {...props}
    />
  </div>
);

export default Input; 