import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/app.css';
import UserProvider from './contexts/UserContext.jsx';
import WorkspacesProvider from './contexts/WorkspacesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <WorkspacesProvider>
        <App />
      </WorkspacesProvider>
    </UserProvider>
  </StrictMode>
);
