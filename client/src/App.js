import './App.css';
import { Route,Routes } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import Task from './components/task/Task';
import Edit from './components/edit/Edit';
import Read from './components/read/Read';
import Create from './components/create/Create';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/todo/tasklist' element={<Task />} />
        <Route path='/todo/edit' element={<Edit />} />
        <Route path='/todo/read' element={<Read />} />
        <Route path='/todo/create' element={<Create />} />
      </Routes>

    </>
  );
}

export default App;
