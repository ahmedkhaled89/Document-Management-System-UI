import { Link } from 'react-router-dom';
import { deleteDoc, downloadDoc } from '../controllers/docController';
import { useState } from 'react';
import Success from './Success';

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
            <i
              title='Download'
              className='fa-solid fa-download'
              onClick={handleDownload}
            ></i>
            <Link to={`/preview/${doc._id}`} title='Preview'>
              <i className='fa-solid fa-eye'></i>
            </Link>
            {doc.ownerID === localStorage.getItem('_id') && (
              <>
                <Link
                  to={`/workspace/${doc.workspaceID}/doc/${doc._id}/update`}
                >
                  <i title='Update' className='fa-solid fa-pen-to-square'></i>
                </Link>
                <i
                  title='Delete'
                  className='fa-solid fa-trash'
                  onClick={handleDelete}
                ></i>
              </>
            )}
          </div>
        </div>
      )}
      {deleted && <Success message='Deleted Successfully' />}
    </div>
  );
};

export default Doc;
