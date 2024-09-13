import { useContext, useState } from 'react';
import Alert from '../../Components/Alert';
import { registerUser } from '../../controllers/userController';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // Use User Context
  const { setUser } = useContext(UserContext);

  // Use Navigate Hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState('');

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register User
      const data = await registerUser({
        firstName,
        lastName,
        nationalID,
        email,
        password,
        passwordConfirm,
      });

      // Update User State
      setUser({
        email,
        nationalID: data.nationalID,
        _id: data._id,
        workspaces: [],
      });

      // Store Data in local storage
      for (let key in data) {
        localStorage.setItem(key, data[key]);
      }
      // Navigate to Home
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1 className='title'>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          className='input'
          type='text'
          placeholder='First Name'
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className='input'
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className='input'
          type='text'
          placeholder='National ID'
          value={nationalID}
          onChange={(e) => setNationalID(e.target.value)}
        />
        <input
          className='input'
          type='email'
          placeholder='Email Address'
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
        <input
          className='input'
          type='password'
          placeholder='Confirm Password'
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button className='btn'>Register</button>
      </form>
      {error && <Alert message={error} />}
    </section>
  );
};

export default Register;
