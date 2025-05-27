import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../ui/Loader';

const FriendGrid = ({ friends, loading }) => {
  const [showAll, setShowAll] = useState(false);
  const displayFriends = showAll ? friends : friends.slice(0, 6);
  const hasMore = friends && friends.length > 6;

  if (loading) {
    return <Loader text="Loading friends..." />;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {friends && friends.length > 0 ? (
          displayFriends.map(friend => (
            <Link to={`/profile/${friend.username}`} key={friend._id} title={friend.username} className="flex flex-col items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(friend.username)}&background=4975d1&color=fff&size=64`}
                alt={friend.username}
                className="w-16 h-16 rounded object-cover hover:shadow-lg transition"
              />
              <span className="mt-1 text-xs text-gray-700 truncate w-16 text-center">{friend.username}</span>
            </Link>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 text-sm">No friends yet</div>
        )}
      </div>
      {hasMore && !showAll && (
        <button
          className="mt-2 text-blue-600 hover:underline text-xs w-full text-center"
          onClick={() => setShowAll(true)}
        >
          Show more
        </button>
      )}
    </>
  );
};

export default FriendGrid; 