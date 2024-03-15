import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import EmployeeList from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return <BrowserRouter>
  <Header />
  <Routes>
  <Route path='/sign-in' element={<Login />} />
  <Route element={<PrivateRoute />}>
  <Route path='/' element={<Home />} />
  <Route path='/employee-list' element={<EmployeeList />} />
  <Route path='/create-employee' element={<CreateEmployee />} />
  <Route path='/update-list/:listingId' element={<EditEmployee />} />
  </Route>
  </Routes>
  </BrowserRouter>;
}

export default App
