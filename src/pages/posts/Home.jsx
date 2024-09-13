import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='card'>
      <h1 className=' text-center text-5xl font-bold'>DMS-Home</h1>
      <div className='card flex justify-center gap-2 bg-slate-500'>
        <Link to='/login' className='card py-2 bg-violet-500 text-center'>
          Login
        </Link>
        <Link to='/register' className='card py-2 bg-violet-500 text-center'>
          Register
        </Link>
      </div>
    </section>
  );
};

export default Home;
