import React from 'react';
import { Link } from 'react-router-dom';

const GenericAvatar = () => (
  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-100 shadow-sm">
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
);

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
            {thought.username ? (
              <Link to={`/profile/${thought.username}`} className="flex-shrink-0">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(thought.username)}&background=4975d1&color=fff&size=64`}
                  alt={thought.username}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm hover:shadow-md transition"
                />
              </Link>
            ) : (
              <GenericAvatar />
            )}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <div>
                  {thought.username ? (
                    <Link to={`/profile/${thought.username}`} className="font-semibold text-blue-700 hover:underline">
                      {thought.username}
                    </Link>
                  ) : null}
                  {thought.createdAt && (
                    <span className="ml-2 text-xs text-gray-400">{thought.createdAt}</span>
                  )}
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