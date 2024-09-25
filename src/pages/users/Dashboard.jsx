import { useContext } from 'react';
import { WorkspacesContext } from '../../contexts/WorkspacesContext';
import Alert from '../../Components/Alert';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { workspaces, error } = useContext(WorkspacesContext);

  return (
    <section className='p-6 bg-gray-100 min-h-screen'>
      {error ? (
        <Alert message={error} />
      ) : (
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-3xl font-bold text-gray-800'>Dashboard</h1>
          <Link
            to='/workspace/new'
            title='Add New Workspace'
            className='flex items-center justify-center w-10 h-10 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200'
          >
            <i className='fa-solid fa-plus'></i>
          </Link>
        </div>
      )}

      {workspaces.length ? (
        workspaces.map((workspace) => (
          <Link key={workspace._id} to={`/workspace/${workspace._id}`}>
            <div
              className={`mb-4 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                workspace.ownerID._id === localStorage.getItem('_id')
                  ? 'bg-slate-700 text-white'
                  : 'bg-indigo-500 text-white'
              }`}
            >
              <h2 className='text-xl font-semibold mb-1'>{workspace.name}</h2>
              <p className='text-sm'>
                <span title='Owner Name'>
                  {`${workspace.ownerID.firstName} ${workspace.ownerID.lastName} `}
                </span>
                | <span title='Owner NID'>{workspace.ownerID.nationalID} </span>
                | <span title='Owner Email'>{workspace.ownerID.email}</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className='text-center text-gray-500 text-lg'>
          No Workspaces Yet!
        </div>
      )}
    </section>
  );
};

export default Dashboard;
