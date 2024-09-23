import { useContext, useState } from 'react';
import Alert from '../../Components/Alert';
import { loginUser } from '../../controllers/userController';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // Use User Context
  const { setUser } = useContext(UserContext);

  // Use Navigate Hook
  const navigate = useNavigate();

  // Error State
  const [error, setError] = useState(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login User
      const data = await loginUser(email, password);

      // Update User State
      setUser({
        email,
        nationalID: data.nationalID,
        _id: data._id,
        workspaces: [],
      });

      // Store User Data in local storage
      for (let key in data) {
        localStorage.setItem(key, data[key]);
      }
      // Navigate to Home
      navigate('/dashboard');
    } catch (error) {
      // Set Error state
      setError(error.message);
    }
  };
  return (
    <section className='card'>
      <h1 className='title'>Login to your Account</h1>
      <form onSubmit={handleLogin}>
        <input
          className='input'
          type='email'
          placeholder='Email Address'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='input'
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn'>Login</button>
      </form>
      <div>
        Do Not Have Account?{' '}
        <Link
          className='text-indigo-900 font-bold'
          title='Register'
          to={'/register'}
        >
          Register
        </Link>
      </div>
      {error && <Alert message={error} />}
    </section>
  );
};

export default Login;
