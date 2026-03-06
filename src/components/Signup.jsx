import { useState } from 'react';
import { signUp } from '../services/supabase';

function Signup({ onSignup, switchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    const { error } = await signUp({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else setSuccess(true);
  };

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <h2 className='signup-title'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control signup-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control signup-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className='alert alert-danger signup-error'>{error}</div>
          )}
          {success && (
            <div className='alert alert-success signup-success'>
              Check your email to confirm registration.
            </div>
          )}

          <button
            type='submit'
            className='btn btn-primary w-100 signup-btn'
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className='signup-footer'>
          <span>Already have an account? </span>
          <button className='btn btn-link switch-login' onClick={switchToLogin}>
            Login
          </button>
        </div>
      </div>

      {/* ====== INLINE STYLES ====== */}
      <style jsx='true'>{`
        .signup-container {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          min-height: 100vh !important;
          background: linear-gradient(
            135deg,
            #f5f7fa 0%,
            #e9ecef 100%
          ) !important;
          padding: 1rem !important;
          animation: fadeIn 0.8s ease-out !important;
        }

        .signup-card {
          background: #ffffff !important;
          border-radius: 20px !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12) !important;
          padding: 2.5rem 2rem !important;
          max-width: 420px !important;
          width: 100% !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }

        .signup-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18) !important;
        }

        .signup-title {
          text-align: center !important;
          font-weight: 700 !important;
          color: #2c3e50 !important;
          margin-bottom: 2rem !important;
          font-size: 1.9rem !important;
          background: linear-gradient(
            135deg,
            #3498db 0%,
            #16a085 100%
          ) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }

        .form-label {
          font-weight: 600 !important;
          font-size: 0.95rem !important;
          color: #2c3e50 !important;
          margin-bottom: 0.5rem !important;
        }

        .signup-input {
          border: 2px solid #e9ecef !important;
          border-radius: 12px !important;
          padding: 0.75rem 1rem !important;
          font-size: 0.95rem !important;
          outline: none !important;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease !important;
        }

        .signup-input:focus {
          border-color: #3498db !important;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15) !important;
          transform: translateY(-1px) !important;
        }

        .signup-btn {
          background: linear-gradient(
            135deg,
            #3498db 0%,
            #2980b9 100%
          ) !important;
          font-weight: 600 !important;
          border-radius: 12px !important;
          padding: 0.75rem !important;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease !important;
        }

        .signup-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
        }

        .signup-error,
        .signup-success {
          border-radius: 12px !important;
          padding: 0.75rem 1rem !important;
          font-size: 0.9rem !important;
          margin-bottom: 1rem !important;
          animation: fadeIn 0.5s ease-out !important;
        }

        .signup-footer {
          text-align: center !important;
          margin-top: 1.5rem !important;
          font-size: 0.9rem !important;
        }

        .switch-login {
          font-weight: 600 !important;
          color: #3498db !important;
          text-decoration: underline !important;
          background: none !important;
          border: none !important;
          padding: 0 !important;
          cursor: pointer !important;
          transition: color 0.3s ease !important;
        }

        .switch-login:hover {
          color: #16a085 !important;
        }

        @media (max-width: 576px) {
          .signup-card {
            padding: 2rem 1.5rem !important;
          }
          .signup-title {
            font-size: 1.6rem !important;
          }
          .signup-input {
            padding: 0.65rem 0.9rem !important;
          }
          .signup-btn {
            padding: 0.65rem !important;
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Signup;
