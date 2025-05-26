import React from 'react';

const Loader = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg mb-4"></div>
    <div className="text-blue-500 font-semibold text-lg">{text}</div>
  </div>
);

export default Loader; 