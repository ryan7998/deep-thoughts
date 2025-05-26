import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="bg-gray-800 px-4 py-2 flex items-center justify-between shadow">
      {/* Left: Logo/Brand */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-lg">DT</div>
        </Link>
        <span className="text-white font-semibold text-xl">Deep Thoughts</span>
      </div>
      {/* Center: Search Bar */}
      <div className="flex-1 mx-8 max-w-xl">
        <input
          type="text"
          placeholder="Search people, jobs & more..."
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Right: Menu Items & User */}
      <div className="flex items-center space-x-6">
        <Link to="#" className="text-gray-200 hover:text-white">Jobs</Link>
        <Link to="#" className="text-gray-200 hover:text-white">Connection</Link>
        <Link to="#" className="text-gray-200 hover:text-white">Pages</Link>
        {/* Notification Icon (placeholder) */}
        <button className="relative">
          <span className="material-icons text-gray-200">notifications</span>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        {/* Auth logic for user/profile */}
        {Auth.loggedIn() ? (
          <>
            <Link to="/profile" className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">Me</Link>
            <button onClick={logout} className="text-gray-200 hover:text-white ml-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-200 hover:text-white">Login</Link>
            <Link to="/signup" className="text-gray-200 hover:text-white">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
