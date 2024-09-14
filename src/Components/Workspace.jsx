/* eslint-disable react/prop-types */
const Workspace = ({ workspace }) => {
  return (
    <div className='card bg-indigo-500 text-white px-4 py-2  mb-2'>
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
  );
};

export default Workspace;
