import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, loading }] = useMutation(LOGIN_USER);
  const [remember, setRemember] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState }
      });
      Auth.login(data.login.token);
      setRedirect(true);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        {/* Logo/Icon */}
        <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center mb-4">
          <span className="text-white text-2xl">&#9813;</span>
        </div>
        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold mb-1 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">Don't miss your next opportunity. Sign in to stay updated on your social world.</p>
        {/* Loader or Login Form */}
        {loading ? (
          <Loader text="Logging in..." />
        ) : (
          <>
            <form className="w-full" onSubmit={handleFormSubmit}>
              <label className="block text-sm font-medium mb-1">Email or Phone</label>
              <Input
                type="text"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email or Phone"
                icon={<UserIcon className="w-5 h-5" />}
                autoComplete="username"
              />
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Password"
                icon={<LockClosedIcon className="w-5 h-5" />}
                autoComplete="current-password"
              />
              <div className="flex items-center mb-4">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm">Remember password</label>
              </div>
              <Button type="submit" variant="primary" className="mb-4">SIGN IN</Button>
              {error && <div className="text-red-500 text-sm mb-2">Login failed</div>}
            </form>
            <div className="text-gray-400 text-sm mb-2">Or login with</div>
            <div className="flex w-full space-x-2 mb-4">
              <Button variant="social" className="bg-blue-900 text-white"><span className="fab fa-instagram"></span> Instagram</Button>
              <Button variant="social" className="bg-blue-700 text-white"><span className="fab fa-linkedin"></span> Linkedin</Button>
              <Button variant="social" className="bg-blue-800 text-white"><span className="fab fa-facebook"></span> Facebook</Button>
            </div>
            <div className="flex justify-between w-full text-sm">
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
              <span>New to Olink? <a href="#" className="text-blue-500 hover:underline">Join now</a></span>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Login;
