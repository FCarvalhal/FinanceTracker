import { useState } from 'react';
import { signIn } from '../services/supabase';

function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else onLogin();
  };

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h2 className='login-title'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control login-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label className='form-label'>Password</label>
            <div className='input-group login-input-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='form-control login-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type='button'
                className='btn toggle-password'
                onClick={() => setShowPassword((v) => !v)}
                aria-label={
                  showPassword ? 'Esconder password' : 'Mostrar password'
                }
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {error && (
            <div className='alert alert-danger login-error'>{error}</div>
          )}

          <button
            type='submit'
            className='btn btn-primary w-100 login-btn'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className='login-footer'>
          <span>Don't have an account? </span>
          <button
            className='btn btn-link switch-signup'
            onClick={switchToSignup}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* ====== INLINE STYLES ====== */}
      <style jsx='true'>{`
        .login-container {
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

        .login-card {
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

        .login-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.18) !important;
        }

        .login-title {
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

        .login-input {
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

        .login-input:focus {
          border-color: #3498db !important;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15) !important;
          transform: translateY(-1px) !important;
        }

        .login-input-group {
          display: flex !important;
          align-items: center !important;
        }

        .toggle-password {
          border: none !important;
          background: #f5f7fa !important;
          cursor: pointer !important;
          padding: 0 0.75rem !important;
          font-size: 1.2rem !important;
          border-left: 1px solid #e9ecef !important;
          border-radius: 0 12px 12px 0 !important;
          transition:
            background 0.3s ease,
            transform 0.3s ease !important;
        }

        .toggle-password:hover {
          background: #ecf0f1 !important;
          transform: translateY(-1px) !important;
        }

        .login-btn {
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

        .login-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
        }

        .login-error {
          border-radius: 12px !important;
          padding: 0.75rem 1rem !important;
          font-size: 0.9rem !important;
          margin-bottom: 1rem !important;
          animation: fadeIn 0.5s ease-out !important;
        }

        .login-footer {
          text-align: center !important;
          margin-top: 1.5rem !important;
          font-size: 0.9rem !important;
        }

        .switch-signup {
          font-weight: 600 !important;
          color: #3498db !important;
          text-decoration: underline !important;
          background: none !important;
          border: none !important;
          padding: 0 !important;
          cursor: pointer !important;
          transition: color 0.3s ease !important;
        }

        .switch-signup:hover {
          color: #16a085 !important;
        }

        @media (max-width: 576px) {
          .login-card {
            padding: 2rem 1.5rem !important;
          }
          .login-title {
            font-size: 1.6rem !important;
          }
          .login-input {
            padding: 0.65rem 0.9rem !important;
          }
          .login-btn {
            padding: 0.65rem !important;
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
