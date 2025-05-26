import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import { Link } from 'react-router-dom';
import Loader from '../components/ui/Loader';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  console.log('userData: ', userData);
  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <aside className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-2" />
              <h2 className="font-bold text-lg mb-1">{userData?.me?.username || 'User'}</h2>
              <p className="text-sm text-gray-500 mb-4">{userData?.me?.email}</p>
              <div className="flex space-x-8 mb-4">
                <div className="text-center">
                  <div className="font-bold text-xl">{userData?.me?.friendCount || 'User'}</div>
                  <div className="text-xs text-gray-400">Connections</div>
                </div>
              </div>
              <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View my profile</button>
            </div>
          </aside>

          {/* Center/Main Content */}
          <section className="space-y-6">
            {/* Thought Form (if logged in) */}
            {loggedIn && (
              <div className="bg-white rounded-lg shadow p-6 mb-4">
                <ThoughtForm />
              </div>
            )}
            {/* Thought List */}
            <div className="bg-white rounded-lg shadow p-6">
              {loading ? (
                <Loader text="Loading thoughts..." />
              ) : (
                <ThoughtList thoughts={thoughts} title="Recent Thoughts" />
              )}
            </div>
          </section>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            {/* Friends */}
            {loggedIn && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-semibold mb-4">Friends</h3>
                <div className="grid grid-cols-3 gap-2">
                  {userData?.me?.friends && userData.me.friends.length > 0 ? (
                    userData.me.friends.slice(0, 6).map(friend => (
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
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Home;
