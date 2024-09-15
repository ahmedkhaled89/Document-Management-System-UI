// ************************ Get All Workspaces ************************
const getAllWorkspaces = async () => {
  // Fetch All Workspaces
  const res = await fetch('/api/workspaces', {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw data.error;
  }
  return data;
};

// ************************ Get Single Workspace By ID ************************
const getWorkspaceById = async (_id) => {
  const res = await fetch(`/api/workspaces/${_id}`, {
    Authorization: `Bearer ${localStorage.token}`,
    'Content-Type': 'Application/json',
  });

  const data = await res.json();
  if (!res.ok) {
    console.log(data);

    throw Error(data.error);
  }
  console.log(data);
  return data;
};
export { getAllWorkspaces, getWorkspaceById };
