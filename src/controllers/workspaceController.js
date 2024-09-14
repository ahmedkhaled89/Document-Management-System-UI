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

export { getAllWorkspaces };
