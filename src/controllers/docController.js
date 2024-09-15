import download from 'downloadjs';

// ************************ Download Document ************************
const downloadDoc = async (_id, fileName) => {
  const res = await fetch(`/api/docs/download/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.blob();

  if (!res.ok) {
    throw Error(data.error);
  }
  download(data, fileName);
};

export { downloadDoc };
