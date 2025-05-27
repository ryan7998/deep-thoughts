import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
import FriendGrid from '../components/FriendList/FriendGrid';
import ThoughtForm from '../components/ThoughtForm';
import { ADD_FRIEND } from '../utils/mutations';
import Auth from '../utils/auth';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Loader from '../components/ui/Loader';
import Button from '../components/ui/Button';

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};
  const loggedInUsername = Auth.getProfile().data.username;
  const isOwnProfile = !userParam || userParam === loggedInUsername;
  const isAlreadyFriend = !isOwnProfile && user?.friends?.some(f => f.username === loggedInUsername);

  // handle click on add friend:
  const [addFriend, { loading: addFriendLoading }] = useMutation(ADD_FRIEND, {
    refetchQueries: [
      {
        query: userParam ? QUERY_USER : QUERY_ME,
        variables: userParam ? { username: userParam } : {},
      },
    ],
  });

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <Loader text="Loading profile..." />;
  }

  // If user goes to /profile without logging in:
  if (!user?.username) {
    return (
      <h4 className="text-center text-gray-500 mt-12">
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row items-center gap-6 mb-8">
        {isOwnProfile ? (
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username)}&background=4975d1&color=fff&size=96`}
            alt={user?.username}
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
        ) : (
          <Link to={`/profile/${user?.username}`}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username)}&background=4975d1&color=fff&size=96`}
              alt={user?.username}
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-100 shadow-sm hover:shadow-md transition"
            />
          </Link>
        )}
        <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            {isOwnProfile ? (
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.username}</h2>
            ) : (
              <Link to={`/profile/${user?.username}`} className="text-2xl font-bold text-blue-700 hover:underline mb-1 block">
                {user?.username}
              </Link>
            )}
            <p className="text-gray-500 mb-2">{user?.email}</p>
            <div className="flex items-center gap-6 mb-2">
              <span className="text-sm text-gray-600 font-medium">Connections: {user?.friendCount}</span>
            </div>
          </div>
          {!isOwnProfile && !isAlreadyFriend && (
            <Button
              type="button"
              variant="primary"
              className="w-auto px-6 py-2 mt-4 sm:mt-0 sm:ml-8"
              onClick={async () => {
                try {
                  await addFriend({ variables: { id: user._id } });
                } catch (e) {
                  console.error(e);
                }
              }}
              disabled={addFriendLoading}
            >
              {addFriendLoading ? 'Adding...' : 'Add Friend'}
            </Button>
          )}
        </div>
      </div>

      {/* Main Content: Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thoughts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <ThoughtList thoughts={user.thoughts} title={`${Auth.getProfile().data.username === user?.username ? 'Your' : `${user.username}'s`} thoughts...`} />
            {/* Render Thought form conditionally in own profile: */}
            <div className="mt-6">{isOwnProfile && <ThoughtForm />}</div>
          </div>
        </div>
        {/* Friends */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-4">Friends</h3>
            <FriendGrid friends={user?.friends || []} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
