import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { WorkspacesContext } from '../../contexts/WorkspacesContext';

const UpdateWorkspace = () => {
  // Extract workspace id from params
  const params = useParams();
  const { _id } = params;
  // Navigator Hook
  const navigate = useNavigate();

  // Use workspaces context
  const { workspaces, setUpdate } = useContext(WorkspacesContext);

  // Workspace Name Hook
  const [name, setName] = useState('');
  useEffect(() => {
    const currentWS = workspaces.find((ws) => ws._id === _id);
    if (currentWS && !name) {
      setName(currentWS.name);
    }
  }, [workspaces]);

  // Handle Updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/workspaces/${_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    console.log(data);

    // Trigger Update
    setUpdate((prev) => prev + 1);

    // Navigate to Workspace Page
    navigate(`/workspace/${_id}`);
  };
  return (
    <section className='card'>
      <h2 className='title'>Update Workspace</h2>
      <form onSubmit={handleUpdate}>
        <input
          type='text'
          placeholder='New Name'
          className='input'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className='btn'>Update</button>
      </form>
    </section>
  );
};

export default UpdateWorkspace;
