import { signOut } from '../services/supabase';

function Logout({ onLogout }) {
  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  return (
    <button className='btn btn-outline-secondary' onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
