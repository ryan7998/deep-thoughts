import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { UserIcon, AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Redirect } from 'react-router-dom';

const Signup = () => {
  // Split username into first and last name for UI
  const [formState, setFormState] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [addUser, { error, loading }] = useMutation(ADD_USER);
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Join first and last name for username
      const username = `${formState.firstName} ${formState.lastName}`.trim();
      const { data } = await addUser({
        variables: {
          username,
          email: formState.email,
          password: formState.password,
        }
      });
      Auth.login(data.addUser.token);
      setRedirect(true);
    } catch (e) {
      console.error(e);
    }
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        {/* Logo/Icon */}
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center mb-4">
          <span className="text-white text-2xl">DT</span>
        </div>
        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold mb-1 text-center">Join Deep Thoughts</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">Make the most of your social life</p>
        {/* Loader or Signup Form */}
        {loading ? (
          <Loader text="Signing up..." />
        ) : (
          <>
            <form className="w-full" onSubmit={handleFormSubmit}>
              <div className="flex space-x-2 mb-4">
                <div className="w-1/2">
                  <Input
                    type="text"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    icon={<UserIcon className="w-5 h-5" />}
                    autoComplete="given-name"
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    type="text"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    icon={<UserIcon className="w-5 h-5" />}
                    autoComplete="family-name"
                  />
                </div>
              </div>
              <Input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email"
                icon={<AtSymbolIcon className="w-5 h-5" />}
                autoComplete="email"
              />
              <Input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Password (6 or more characters)"
                icon={<LockClosedIcon className="w-5 h-5" />}
                autoComplete="new-password"
              />
              <div className="text-xs text-gray-500 mb-4">
                You agree to the Olink <a href="#" className="text-blue-500 hover:underline">User Agreement</a>, <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>, and <a href="#" className="text-blue-500 hover:underline">Cookie Policy</a>.
              </div>
              <Button type="submit" variant="primary" className="mb-4">AGREE & JOIN</Button>
              {error && <div className="text-red-500 text-sm mb-2">Sign up failed</div>}
            </form>
            <div className="text-gray-400 text-sm mb-2">Or login with</div>
            <div className="flex w-full space-x-2 mb-4">
              <Button variant="social" className="bg-blue-900 text-white"><span className="fab fa-instagram"></span> Instagram</Button>
              <Button variant="social" className="bg-blue-700 text-white"><span className="fab fa-linkedin"></span> Linkedin</Button>
              <Button variant="social" className="bg-blue-800 text-white"><span className="fab fa-facebook"></span> Facebook</Button>
            </div>
            <div className="flex justify-between w-full text-sm">
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
              <span>Already on Deep Thoughts? <a href="/login" className="text-blue-500 hover:underline">Sign in</a></span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Signup;
