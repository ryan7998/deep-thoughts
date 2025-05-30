import React from 'react';
import { Link } from 'react-router-dom';

const ReactionList = ({ reactions }) => {
  if (!reactions || reactions.length === 0) return null;
  return (
    <div className="my-5">
      <h4 className="text-lg font-semibold mb-4 text-gray-700">Comments</h4>
      <div className="space-y-4">
        {reactions.map(reaction => (
          <div key={reaction._id} className="bg-gray-50 rounded-lg p-4 flex gap-3 items-start shadow-sm">
            <Link to={`/profile/${reaction.username}`} className="flex-shrink-0">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reaction.username)}&background=4975d1&color=fff&size=48`}
                alt={reaction.username}
                className="w-10 h-10 rounded-full object-cover border border-blue-100 shadow"
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Link to={`/profile/${reaction.username}`} className="font-medium text-blue-700 hover:underline text-sm">
                  {reaction.username}
                </Link>
                <span className="text-xs text-gray-400">{reaction.createdAt}</span>
              </div>
              <div className="text-gray-800 text-sm">{reaction.reactionBody}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReactionList;