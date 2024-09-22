import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Dashboard from './pages/users/Dashboard';
import Home from './pages/posts/Home';
import Upload from './pages/documents/Upload';
import Workspace from './Components/Workspace';
import Search from './pages/documents/Search';
import CreateWorkspace from './pages/workspaces/CreateWorkspace';
import UpdateWorkspace from './pages/workspaces/UpdateWorkspace';
import UpdateDoc from './pages/documents/UpdateDoc';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='search' element={<Search />} />
          <Route path='workspace'>
            <Route path='new' element={<CreateWorkspace />} />
            <Route path='update/:_id' element={<UpdateWorkspace />} />
            <Route path=':_id' element={<Workspace />} />
          </Route>
          <Route path='workspace/:workspaceID/upload' element={<Upload />} />
          <Route
            path='workspace/:workspaceID/doc/:docID/update'
            element={<UpdateDoc />}
          />

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
