/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { getAllWorkspaces } from '../controllers/workspaceController';
import { UserContext } from './UserContext';

export const WorkspacesContext = createContext();

const WorkspacesProvider = ({ children }) => {
  // Workspace Status
  const [workspaces, setWorkspaces] = useState([]);

  const { user } = useContext(UserContext);

  // Error Status
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user.email) {
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
    }
  }, [user]);

  return (
    <WorkspacesContext.Provider
      value={{ workspaces, setWorkspaces, error, setError }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export default WorkspacesProvider;
