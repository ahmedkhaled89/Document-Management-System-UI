/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { getUserWorkspaces } from '../controllers/workspaceController';
import { UserContext } from './UserContext';

export const WorkspacesContext = createContext();

const WorkspacesProvider = ({ children }) => {
  // Workspace Status
  const [workspaces, setWorkspaces] = useState([]);

  const { user } = useContext(UserContext);

  // Update State
  const [update, setUpdate] = useState(0);

  // Error Status
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user.email) {
      (async () => {
        try {
          // Get All Workspaces
          const data = await getUserWorkspaces();
          // Update Workspaces state
          setWorkspaces(data.workspaces);
        } catch (error) {
          setError(error);
        }
      })();
    }
  }, [user, update]);

  return (
    <WorkspacesContext.Provider
      value={{ workspaces, setWorkspaces, error, setError, setUpdate, update }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

export default WorkspacesProvider;
