/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const WorkspacesContext = createContext();

const WorkspacesProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);

  return (
    <WorkspacesContext.Provider value={{ workspaces, setWorkspaces }}>
      {children}
    </WorkspacesContext.Provider>
  );
};

export default WorkspacesProvider;
