/* eslint-disable react/prop-types */
const Alert = ({ message }) => {
  return (
    <div className='bg-red-500 text-white p-2 rounded-md mt-2 text-sm'>
      <i className='fa-solid fa-triangle-exclamation'></i> {message}
    </div>
  );
};

export default Alert;
