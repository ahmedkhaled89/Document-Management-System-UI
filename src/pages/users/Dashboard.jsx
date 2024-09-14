import { useContext, useEffect, useState } from 'react';
import { getAllWorkspaces } from '../../controllers/workspaceController';
import { WorkspacesContext } from '../../contexts/WorkspacesContext';
import Alert from '../../Components/Alert';
import Workspace from '../../Components/Workspace';

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
    // setTimeout(
    //   async () => {
    //   try {
    //     // Get All Workspaces
    //     const data = await getAllWorkspaces();
    //     // Update Workspaces state
    //     setWorkspaces(data.workspaces);
    //   } catch (error) {
    //     setError(error);
    //   }
    // }, 0);
  }, []);

  return (
    <section className='card'>
      <h1 className='title'>Dashboard</h1>

      {workspaces &&
        workspaces.map((workspace) => (
          <Workspace key={workspace._id} workspace={workspace} />
        ))}
      {error && <Alert message={error} />}
    </section>
  );
};

export default Dashboard;
