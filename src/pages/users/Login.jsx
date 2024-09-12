import { useState } from 'react';
import Alert from '../../Components/Alert';
import { loginUser } from '../../controllers/userController';

const Login = () => {
  // Error State
  const [error, setError] = useState(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);

      // Stor Data in local storage
      for (let key in data) {
        localStorage.setItem(key, data[key]);
      }
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
      {error && <Alert message={error} />}
    </section>
  );
};

export default Login;
