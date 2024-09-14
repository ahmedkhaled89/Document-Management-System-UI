import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const Doc = ({ doc }) => {
  return (
    <div className='card bg-slate-100 text-sky-900 font-bold mb-2 p-2 flex justify-between'>
      <h3>{doc.docName}</h3>
      <div className='flex gap-2'>
        <Link title='Download' className='fa-solid fa-download'></Link>
        <Link title='Preview' className='fa-solid fa-eye'></Link>
        {doc.ownerID == localStorage.getItem('_id') && (
          <>
            <Link title='Update' className='fa-solid fa-pen-to-square'></Link>
            <Link title='Delete' className='fa-solid fa-trash'></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Doc;
