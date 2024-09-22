import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Upload = () => {
  // Get workspaceID from location
  const params = useParams();
  const { workspaceID } = params;

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
    const res = await fetch('/api/docs/upload', {
      method: 'POST',
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
    navigate(`/workspace/${workspaceID}`);
  };

  return (
    <section className='card'>
      <h2>Upload New Document</h2>
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type='file' onChange={handleChange} />
        <button className='btn mt-1 w-auto' type='submit'>
          Upload
        </button>
      </form>
    </section>
  );
};

export default Upload;
