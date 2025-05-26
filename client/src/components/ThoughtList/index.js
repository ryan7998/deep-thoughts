import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({ thoughts, title }) => {
  if (!thoughts.length) {
    return <h3 className="text-center text-gray-400 text-lg font-medium py-8">No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-4">
        {thoughts.map(thought => (
          <div key={thought._id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 items-start">
            <Link to={`/profile/${thought.username}`} className="flex-shrink-0">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(thought.username)}&background=4975d1&color=fff&size=64`}
                alt={thought.username}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm hover:shadow-md transition"
              />
            </Link>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <div>
                  <Link to={`/profile/${thought.username}`} className="font-semibold text-blue-700 hover:underline">
                    {thought.username}
                  </Link>
                  <span className="ml-2 text-xs text-gray-400">{thought.createdAt}</span>
                </div>
              </div>
              <Link to={`/thought/${thought._id}`} className="block mt-1 mb-2 text-gray-800 hover:text-blue-700">
                <p className="text-base">{thought.thoughtText}</p>
              </Link>
              <div className="flex items-center text-xs text-gray-500">
                <span className="mr-2">Reactions: {thought.reactionCount}</span>
                <Link to={`/thought/${thought._id}`} className="text-blue-500 hover:underline">
                  {thought.reactionCount ? 'See discussion' : 'Start the discussion!'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThoughtList;