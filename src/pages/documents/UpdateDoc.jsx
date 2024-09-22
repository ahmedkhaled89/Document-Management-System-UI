import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDoc = () => {
  // Get workspaceID from location
  const params = useParams();
  const { docID } = params;
  const { workspaceID } = params;
  console.log(docID);
  console.log(workspaceID);

  // Navigate Hook
  const navigate = useNavigate();

  // File State
  const [file, setFile] = useState();

  // Set File state
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('doc', file);
    formData.append('workspaceID', workspaceID);
    const res = await fetch(`/api/docs/${docID}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.error);
      throw Error(data.error);
    }
    console.log(data);
    // navigate(`/workspace/${workspaceID}`);
  };

  return (
    <section className='card'>
      <h2>Update Document</h2>
      <form onSubmit={handleSubmit}>
        <h1>Upload new Document</h1>
        <input type='file' onChange={handleChange} />
        <button className='btn mt-1 w-auto' type='submit'>
          Update
        </button>
      </form>
    </section>
  );
};

export default UpdateDoc;
