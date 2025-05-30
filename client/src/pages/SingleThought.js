import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { REMOVE_THOUGHT } from '../utils/mutations';
import Auth from '../utils/auth';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Loader from '../components/ui/Loader';
import ThoughtCard from '../components/ThoughtList/ThoughtCard';

const SingleThought = props => {
  const { id: thoughtId } = useParams();
  const history = useHistory();
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId }
  });
  const thought = data?.thought || {};

  const [removeThought] = useMutation(REMOVE_THOUGHT, {
    update(cache) {
      try {
        // Remove the thought from the cache
        cache.evict({ id: cache.identify(thought) });
        cache.gc();
      } catch (e) {
        console.error(e);
      }
    },
    onCompleted() {
      // Redirect to home page after successful deletion
      history.push('/');
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

  if (loading) {
    return <Loader text="Loading thought..." />;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <ThoughtCard
        thought={thought}
        onDelete={handleDeleteThought}
        showDeleteButton={true}
        isSingleView={true}
        showThoughtId={true}
      />
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
