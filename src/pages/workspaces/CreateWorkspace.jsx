import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspacesContext } from '../../contexts/WorkspacesContext';

const CreateWorkspace = () => {
  const name = useRef('');
  const navigate = useNavigate();
  // Update State
  const { setUpdate } = useContext(WorkspacesContext);

  const handleCreate = (e) => {
    e.preventDefault();
    const n = name.current;
    const createWorkspace = async (n) => {
      const res = await fetch(`/api/workspaces/createworkspace`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name: n }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
      }
      console.log(data._id);
      // Trigger Update state
      setUpdate((prev) => prev + 1);
      navigate(`/workspace/${data._id}`);
    };
    createWorkspace(n);
  };
  return (
    <section className='card'>
      <h2 className='title'>Create new workspace</h2>
      <form onSubmit={handleCreate}>
        <input
          required
          type='text'
          className='input'
          placeholder='Workspace Name'
          onChange={(e) => (name.current = e.target.value)}
        />
        <button type='submit' className='btn'>
          Create
        </button>
      </form>
    </section>
  );
};

export default CreateWorkspace;
