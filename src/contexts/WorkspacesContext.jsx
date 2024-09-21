/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { getAllWorkspaces } from '../controllers/workspaceController';

export const WorkspacesContext = createContext();

const WorkspacesProvider = ({ children }) => {
  // Workspace Status
  const [workspaces, setWorkspaces] = useState([]);

  // Error Status
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Get All Workspaces
        const data = await getAllWorkspaces();
        // Update Workspaces state
        setWorkspaces(data.workspaces);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return (
    <WorkspacesContext.Provider
      value={{ workspaces, setWorkspaces, error, setError }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export default WorkspacesProvider;
