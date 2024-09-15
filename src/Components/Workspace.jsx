import Doc from './Doc';

/* eslint-disable react/prop-types */
const Workspace = ({ workspace }) => {
  return (
    <div className='card mb-6 bg-slate-200'>
      <div className='flex justify-between'>
        <div>
          <h2
            title='Workspace Name'
            className='font-bold text-lg first-letter:uppercase mb-[-6px]'
          >
            {workspace.name}
          </h2>
          <p className='text-[10px] mb-4'>
            <span title='Owner Name'>
              {`${workspace.ownerID.firstName} ${workspace.ownerID.lastName} `}
            </span>
            |<span title='Owner NID'> {workspace.ownerID.nationalID} </span> |
            <span title='Owner Email'> {workspace.ownerID.email}</span>
          </p>
        </div>
        <div>
          <i
            to={`upload`}
            title='Add New Document'
            className='fa-solid fa-plus'
          ></i>
        </div>
      </div>

      <div>
        {workspace.DocsIDs &&
          workspace.DocsIDs.map((d) => <Doc key={d._id} doc={d} />)}
      </div>
    </div>
  );
};

export default Workspace;
