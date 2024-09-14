/* eslint-disable react/prop-types */
const Workspace = ({ workspace }) => {
  return (
    <div className='card bg-red-400 mb-5'>
      <p>{workspace.name}</p>
      <p>{workspace.ownerID.email}</p>
    </div>
  );
};

export default Workspace;
