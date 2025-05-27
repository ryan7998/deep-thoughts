import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import { Link, Redirect } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import FriendGrid from '../components/FriendList/FriendGrid';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData, loading: userLoading } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Main Content (3/4 width) */}
          <section className="space-y-6 lg:col-span-4">
            {/* Thought Form (if logged in) */}
            <div className="bg-white rounded-lg shadow p-6 mb-4">
              <ThoughtForm />
            </div>
            {/* Thought List */}
            <div className="bg-white rounded-lg shadow p-6">
              {loading ? (
                <Loader text="Loading thoughts..." />
              ) : (
                <ThoughtList thoughts={thoughts} title="Recent Thoughts" />
              )}
            </div>
          </section>

          {/* Right Sidebar (1/4 width) */}
          <aside className="space-y-6 lg:col-span-2">
            {/* Profile Card */}
            {userLoading ? (
              <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center min-h-[180px]">
                <Loader text="Loading profile..." />
              </div>
            ) : (
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
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  <Link to="/profile">View my profile</Link>
                </button>
              </div>
            )}
            {/* Friends */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Friends</h3>
              <FriendGrid friends={userData?.me?.friends || []} loading={loading}/>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Home;
