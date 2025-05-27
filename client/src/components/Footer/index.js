import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 border-t border-gray-900 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-white text-sm flex flex-col items-center gap-1">
        <span>&copy; {new Date().getFullYear()} Fazle Ryan. All rights reserved.</span>
        <span className="text-xs">Built with MERN & Tailwind CSS &mdash; <a href="https://github.com/ryan7998/deep-thoughts" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a></span>
      </div>
    </footer>
  );
};

export default Footer;
