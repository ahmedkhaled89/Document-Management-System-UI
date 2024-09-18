import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWorkspace = () => {
  const name = useRef('');
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    const n = name.current;
    const createWorkspce = async (n) => {
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
      navigate(`/workspace/${data._id}`);
    };
    createWorkspce(n);
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
