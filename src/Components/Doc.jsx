import { Link } from 'react-router-dom';
import { deleteDoc, downloadDoc } from '../controllers/docController';
import { useState } from 'react';

/* eslint-disable react/prop-types */
const Doc = ({ doc }) => {
  // Delete State
  const [deleted, setDeleted] = useState(false);

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

  // Handle Delete
  const handleDelete = async () => {
    try {
      const data = await deleteDoc(_id);
      console.log(data);
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!deleted && (
        <div className='card font-bold mb-2 p-2 flex justify-between'>
          <h3>{doc.docName}</h3>
          <div className='flex gap-2'>
            <Link
              title='Download'
              className='fa-solid fa-download'
              onClick={handleDownload}
            ></Link>
            <Link title='Preview' className='fa-solid fa-eye'></Link>
            {doc.ownerID._id === localStorage.getItem('_id') && (
              <>
                <Link
                  title='Update'
                  className='fa-solid fa-pen-to-square'
                ></Link>
                <Link
                  title='Delete'
                  className='fa-solid fa-trash'
                  onClick={handleDelete}
                ></Link>
              </>
            )}
          </div>
        </div>
      )}
      {deleted && <div>Deleted Successfully</div>}
    </div>
  );
};

export default Doc;
