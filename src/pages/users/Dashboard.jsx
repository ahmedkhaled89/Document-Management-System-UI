import { useContext } from 'react';
import { WorkspacesContext } from '../../contexts/WorkspacesContext';
import Alert from '../../Components/Alert';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Use Workspaces State to get Workspaces or error
  const { workspaces, error } = useContext(WorkspacesContext);

  return (
    <section className='card'>
      {error ? (
        <Alert message={error} />
      ) : (
        <div className='flex items-center justify-between'>
          <h1 className='title'>Dashboard</h1>
          <div>
            <Link
              to='/workspace/new'
              title='Add New Workspace'
              className='fa-solid fa-plus'
            ></Link>
          </div>
        </div>
      )}

      {workspaces &&
        workspaces.map((workspace) => (
          <Link key={workspace._id} to={`/workspace/${workspace._id}`}>
            <div
              className={`card mb-2 p-2 text-white ${
                workspace.ownerID._id === localStorage.getItem('_id')
                  ? 'bg-slate-700'
                  : 'bg-indigo-500'
              }`}
            >
              <h2 className='title mb-0'>{workspace.name}</h2>
              <p className='text-[10px] mb-4'>
                <span title='Owner Name'>
                  {`${workspace.ownerID.firstName} ${workspace.ownerID.lastName} `}
                </span>
                |<span title='Owner NID'> {workspace.ownerID.nationalID} </span>
                |<span title='Owner Email'> {workspace.ownerID.email}</span>
              </p>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Dashboard;
