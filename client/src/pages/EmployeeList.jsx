import React from 'react'
import DataTable from '../components/DataTable'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
const EmployeeList = () => {
  return (
    
    <div className='container max-w-7xl m-auto'>
    <h1 className='text-3xl text-center m-5 uppercase text-slate-700'>Employee's List</h1>
    
    <DataTable />
   <Link to='/create-employee'> <button className='bg-green-700 rounded-lg p-3 text-white text-center mt-5'><AddIcon />Add More Employee </button></Link>
    </div> 
  )
}

export default EmployeeList