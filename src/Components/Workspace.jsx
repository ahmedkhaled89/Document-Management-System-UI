import { Link, useNavigate, useParams } from 'react-router-dom';
import Doc from './Doc';
import { useContext, useEffect, useState } from 'react';
import { deleteWorkspace } from '../controllers/workspaceController';
import { WorkspacesContext } from '../contexts/WorkspacesContext';
import Success from './Success';

const Workspace = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  // Update State
  const { setUpdate } = useContext(WorkspacesContext);

  const [workspace, setWorkspace] = useState();
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/workspaces/${_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        return console.log('ERROR!!!', data.error);
      }
      setWorkspace(data.workspace);
    })();
  }, []);

  const handleDelete = async (_id) => {
    await deleteWorkspace(_id);
    setDeleted(true);
    // Trigger Update after delete workspace
    setUpdate((prev) => prev + 1);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className='card mb-6 bg-indigo-500'>
      {workspace && !deleted && (
        <>
          <div className='flex justify-between text-white'>
            <div>
              <Link
                state={workspace}
                title='Workspace Name'
                to={`/workspace/${workspace._id}`}
              >
                <h2 className='font-bold text-lg first-letter:uppercase mb-[-6px]'>
                  {workspace.name}
                </h2>
                <p className='text-[10px] mb-4'>
                  <span title='Owner Name'>
                    {`${workspace.ownerID.firstName} ${workspace.ownerID.lastName} `}
                  </span>
                  |
                  <span title='Owner NID'>{workspace.ownerID.nationalID} </span>
                  |<span title='Owner Email'> {workspace.ownerID.email}</span>
                </p>
              </Link>
            </div>
            <div className='flex gap-2 items-start'>
              <Link
                to={`/workspace/${_id}/upload`}
                state={{ workspaceID: workspace._id }}
                title='Add New Document'
              >
                <i className='fa-solid fa-plus'></i>
              </Link>

              {localStorage.getItem('_id') === workspace.ownerID._id && (
                <>
                  <Link
                    title='Update Workspace'
                    to={`/workspace/update/${_id}`}
                  >
                    <i className='fa-solid fa-pen'></i>
                  </Link>
                  <i
                    title='Delete'
                    className='fa-solid fa-trash'
                    onClick={() => handleDelete(workspace._id)}
                  ></i>
                </>
              )}
            </div>
          </div>
          <div>
            {workspace.DocsIDs.length ? (
              workspace.DocsIDs.map((d) => <Doc key={d._id} doc={d} />)
            ) : (
              <div className='title text-white text-center'>No Docs Yet!</div>
            )}
          </div>
        </>
      )}
      {deleted && <Success message='Workspace Deleted Successfully' />}
    </div>
  );
};

export default Workspace;
