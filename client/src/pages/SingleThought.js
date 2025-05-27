import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import Auth from '../utils/auth';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Loader from '../components/ui/Loader';

const SingleThought = props => {
  const { id: thoughtId } = useParams();
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });
  const thought = data?.thought || {};

  if (loading) {
    return <Loader text="Loading thought..." />;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <Link to={`/profile/${thought.username}`} className="flex-shrink-0">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(thought.username)}&background=4975d1&color=fff&size=64`}
              alt={thought.username}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-100 shadow-sm hover:shadow-md transition"
            />
          </Link>
          <div className="ml-4">
            <Link to={`/profile/${thought.username}`} className="font-semibold text-blue-700 hover:underline">
              {thought.username}
            </Link>
            <div className="text-xs text-gray-400">{thought.createdAt}</div>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-lg text-gray-800">{thought.thoughtText}</p>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span className="mr-2">Reactions: {thought.reactionCount}</span>
          <span className="text-gray-300">|</span>
          <span className="ml-2">Thought ID: {thought._id}</span>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
