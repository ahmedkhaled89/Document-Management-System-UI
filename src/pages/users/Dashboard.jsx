import { useContext, useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../controllers/workspaceController';
import { WorkspacesContext } from '../../contexts/WorkspacesContext';
import Alert from '../../Components/Alert';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Error State
  const [error, setError] = useState(null);

  // Use Workspaces State
  const { workspaces, setWorkspaces } = useContext(WorkspacesContext);

  useEffect(() => {
    (async () => {
      try {
        // Get All Workspaces
        const data = await getAllWorkspaces();
        // Update Workspaces state
        setWorkspaces(data.workspaces);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return (
    <section className='card'>
      <div className='flex items-center justify-between'>
        <h1 className='title'>Dashboard</h1>
        <div>
          <Link title='Add New Workspace' className='fa-solid fa-plus'></Link>
        </div>
      </div>
      {workspaces &&
        workspaces.map((workspace) => (
          <Link key={workspace._id} to={`/workspace/${workspace._id}`}>
            <div className='card mb-2 p-2 bg-indigo-500'>
              <h2 className='title'>{workspace.name}</h2>
            </div>
          </Link>
        ))}
      {error && <Alert message={error} />}
    </section>
  );
};

export default Dashboard;
