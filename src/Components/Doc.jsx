import { Link } from 'react-router-dom';
import { downloadDoc } from '../controllers/docController';

/* eslint-disable react/prop-types */
const Doc = ({ doc }) => {
  // Grab Doc Name and id
  const _id = doc._id;
  const fileName = doc.docName;

  // Handle Download
  const handleDownload = async () => {
    try {
      await downloadDoc(_id, fileName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='card font-bold mb-2 p-2 flex justify-between'>
      <h3>{doc.docName}</h3>
      <div className='flex gap-2'>
        <Link
          title='Download'
          className='fa-solid fa-download'
          onClick={handleDownload}
        ></Link>
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
