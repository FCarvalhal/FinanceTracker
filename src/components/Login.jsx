import React, { useState } from 'react';
import { signIn } from '../services/supabase';

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error, data } = await signIn({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else onLogin();
  };

  return (
    <div className='container mt-5' style={{ maxWidth: 400 }}>
      <h2 className='mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
        <button
          type='submit'
          className='btn btn-primary w-100'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className='mt-3 text-center'>
        <span>Don't have an account? </span>
        <button className='btn btn-link p-0' onClick={switchToSignup}>
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
