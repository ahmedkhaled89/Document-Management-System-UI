import { Link, useParams } from 'react-router-dom';
import Doc from './Doc';
import { useEffect, useState } from 'react';

const Workspace = () => {
  const { _id } = useParams();

  const [workspace, setWorkspace] = useState();
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

  return (
    <div className='card mb-6 bg-indigo-500'>
      {workspace && (
        <>
          <div className='flex justify-between'>
            <div>
              <Link
                state={workspace}
                title='Workspace Name'
                to={`/workspace/${workspace._id}`}
              >
                <h2 className='font-bold text-lg first-letter:uppercase mb-[-6px]'>
                  {workspace.name}
                </h2>
              </Link>
              <p className='text-[10px] mb-4'>
                <span title='Owner Name'>
                  {`${workspace.ownerID.firstName} ${workspace.ownerID.lastName} `}
                </span>
                |<span title='Owner NID'> {workspace.ownerID.nationalID} </span>
                |<span title='Owner Email'> {workspace.ownerID.email}</span>
              </p>
            </div>
            <div>
              <Link
                to={`/upload`}
                state={{ workspaceID: workspace._id }}
                title='Add New Document'
                className='fa-solid fa-plus'
              ></Link>
            </div>
          </div>
          <div>
            {workspace.DocsIDs &&
              workspace.DocsIDs.map((d) => <Doc key={d._id} doc={d} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default Workspace;
