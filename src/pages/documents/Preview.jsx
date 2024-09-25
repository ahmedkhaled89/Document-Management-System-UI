import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Preview = () => {
  const [fileData, setFileData] = useState(null);
  const params = useParams();
  const { _id } = params;

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/docs/preview/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setFileData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFile();
  }, []);

  const createBlobUrl = (base64String, type) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteNumbers], { type });
    return URL.createObjectURL(blob);
  };

  if (!fileData) {
    return <div>Loading...</div>;
  }

  const { base64String, type, extension, docName, originalname } = fileData;
  console.log(type);

  const blobUrl = createBlobUrl(base64String, type);

  return (
    <div className='card' height='auto'>
      {type.startsWith('image/') && (
        <img src={blobUrl} alt='Preview' style={{ maxWidth: '100%' }} />
      )}
      {type.startsWith('video/') && (
        <video src={blobUrl} controls style={{ maxWidth: '100%' }} />
      )}
      {type.startsWith('audio/') && <audio src={blobUrl} controls />}
      {type === 'application/pdf' && (
        <iframe src={blobUrl} width='100%' height='700px' title='PDF Preview' />
      )}

      {!type.startsWith('image/') &&
        !type.startsWith('video/') &&
        !type.startsWith('audio/') &&
        type !== 'application/pdf' && (
          <a href={blobUrl} download={`${docName || 'file'}.${extension}`}>
            Download file
          </a>
        )}
    </div>
  );
};

export default Preview;
