import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const GenericAvatar = () => (
  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-100 shadow-sm">
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
);

const ThoughtCard = ({ 
  thought, 
  onDelete, 
  showDeleteButton = false,
  isSingleView = false,
  showThoughtId = false 
}) => {
  const isOwnThought = thought.username === Auth.getProfile()?.data?.username;
  const shouldShowDelete = showDeleteButton || isOwnThought;

  const UserAvatar = () => (
    thought.username ? (
      <Link to={`/profile/${thought.username}`} className="flex-shrink-0">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(thought.username)}&background=4975d1&color=fff&size=64`}
          alt={thought.username}
          className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm hover:shadow-md transition"
        />
      </Link>
    ) : (
      <GenericAvatar />
    )
  );

  const UserInfo = () => (
    <div className="flex items-center">
      <UserAvatar />
      <div className="ml-4">
        {thought.username ? (
          <Link to={`/profile/${thought.username}`} className="font-semibold text-blue-700 hover:underline">
            {thought.username}
          </Link>
        ) : null}
        {thought.createdAt && (
          <div className="text-xs text-gray-400">{thought.createdAt}</div>
        )}
      </div>
    </div>
  );

  const ThoughtContent = () => (
    isSingleView ? (
      <p className="text-lg text-gray-800">{thought.thoughtText}</p>
    ) : (
      <Link to={`/thought/${thought._id}`} className="block mt-1 mb-2 text-gray-800 hover:text-blue-700">
        <p className="text-base">{thought.thoughtText}</p>
      </Link>
    )
  );

  const ThoughtFooter = () => (
    <div className="flex items-center text-xs text-gray-500">
      <span className="mr-2">Reactions: {thought.reactionCount}</span>
      {!isSingleView && (
        <Link to={`/thought/${thought._id}`} className="text-blue-500 hover:underline">
          {thought.reactionCount ? 'See discussion' : 'Start the discussion!'}
        </Link>
      )}
      {showThoughtId && (
        <>
          <span className="text-gray-300 mx-2">|</span>
          <span>Thought ID: {thought._id}</span>
        </>
      )}
      {shouldShowDelete && (
        <button
          onClick={() => onDelete(thought._id)}
          className="ml-auto text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row gap-4 items-start">
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
          <UserInfo />
        </div>
        <ThoughtContent />
        <ThoughtFooter />
      </div>
    </div>
  );
};

export default ThoughtCard; 