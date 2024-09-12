import { Link } from 'react-router-dom';

const Layout = () => {
  return (
    <header className='bg-indigo-600 text-white'>
      <nav className='flex items-center justify-between p-4'>
        <Link to='/' className='fa-solid fa-house-chimney nav-link'></Link>
        <div className='flex gap-2'>
          <Link
            to='/login'
            className='fa-solid fa-right-to-bracket nav-link'
          ></Link>
          <Link
            to='/register'
            className='fa-solid fa-user-plus nav-link'
          ></Link>
        </div>
      </nav>
    </header>
  );
};

export default Layout;
