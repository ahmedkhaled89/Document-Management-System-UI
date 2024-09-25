import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Layout = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm('Confirm Logout')) {
      setUser({});
      localStorage.clear();
      // navigate to login
      navigate('/login');
    }
  };

  return (
    <>
      <header className='sticky top-0 z-[1] bg-indigo-600 text-white shadow-md'>
        <nav className='flex items-center justify-between p-4 max-w-7xl mx-auto'>
          <Link title='Home' to='/' className='text-xl font-semibold'>
            <i className='fa-solid fa-house-chimney'></i>
          </Link>
          <div className='flex items-center gap-4'>
            {user.email ? (
              <>
                <Link
                  title='Dashboard'
                  to='/dashboard'
                  className='nav-link hover:text-indigo-300'
                >
                  <i className='fa-solid fa-circle-user'></i>
                </Link>
                <Link
                  title='Search Document'
                  to='/search'
                  className='nav-link hover:text-indigo-300'
                >
                  <i className='fa-solid fa-search'></i>
                </Link>
                <button
                  title='Logout'
                  onClick={handleLogout}
                  className='nav-link hover:text-indigo-300'
                >
                  <i className='fa-solid fa-right-from-bracket'></i>
                </button>
              </>
            ) : (
              <>
                <Link
                  title='Login'
                  to='/login'
                  className='nav-link hover:text-indigo-300'
                >
                  <i className='fa-solid fa-right-to-bracket'></i>
                </Link>
                <Link
                  title='Register'
                  to='/register'
                  className='nav-link hover:text-indigo-300'
                >
                  <i className='fa-solid fa-user-plus'></i>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className='p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-lg mt-4'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
