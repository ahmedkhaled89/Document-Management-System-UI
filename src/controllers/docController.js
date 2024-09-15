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

// ************************ Delete Document ************************
const deleteDoc = async (_id) => {
  const res = await fetch(`/api/docs/delete/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  console.log(data.status);
  return data.status;
};

export { downloadDoc, deleteDoc };
