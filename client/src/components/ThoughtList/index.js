import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import ThoughtCard from './ThoughtCard';

const GenericAvatar = () => (
  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center border-2 border-blue-100 shadow-sm">
    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </div>
);

const ThoughtList = ({ thoughts, title, showDeleteButton = false }) => {
  const [removeThought] = useMutation(REMOVE_THOUGHT, {
    update(cache, { data: { removeThought } }) {
      try {
        // Read the current cache data
        const { me } = cache.readQuery({ query: QUERY_ME });
        
        // Update the cache with the new thoughts array
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: {
              ...me,
              thoughts: me.thoughts.filter(thought => thought._id !== removeThought._id)
            }
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  const handleDeleteThought = async (thoughtId) => {
    try {
      await removeThought({
        variables: { thoughtId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!thoughts.length) {
    return <h3 className="text-center text-gray-400 text-lg font-medium py-8">No Thoughts Yet</h3>;
  }

  const loggedInUsername = Auth.getProfile()?.data?.username;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <div className="space-y-4">
        {thoughts.map(thought => (
          <ThoughtCard
            key={thought._id}
            thought={thought}
            onDelete={handleDeleteThought}
            showDeleteButton={showDeleteButton}
          />
        ))}
      </div>
    </div>
  );
};

export default ThoughtList;