import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';



export default function DataTable() {
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const employeeData = async () => {
            const res = await fetch(`/api/listing/get`)
            const data = await res.json();
            console.log(data);
            setRows(data);
        }
        employeeData();
    }, []);
    const handleDeleteListing = async (id) => {

        try {

            const res = await fetch(`/api/listing/delete/${id}`, {
                method: "DELETE",

            })
            const data = res.json();
            if (data.success == false) {
                console.log(data.message);
                return;
            }
            setRows((prev) =>
                prev.filter((listing) => listing._id !== id));

        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow >
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Email</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Mobile No.</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Designation</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Gender</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Course</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Image</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Create Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.mobileno}</TableCell>
                            <TableCell align="center">{row.designation}</TableCell>
                            <TableCell align="center">{row.gender}</TableCell>
                            <TableCell align="center">{row.course.map((co) => (<p>{co}</p>))}</TableCell>
                            <TableCell align="center"><img className="mx-auto max-w-full h-auto" style={{ maxHeight: '100px' }} src={row.image} alt='image' /></TableCell>
                            <TableCell align="center">
                                {new Date(row.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="center">

                                <button onClick={() => handleDeleteListing(row._id)} className='bg-red-700 w-20 text-white rounded-full p-2 uppercase'> delete </button>
                                <Link to={`/update-list/${row._id}`}> <button className='bg-green-700 w-20 text-white rounded-full p-2 uppercase'> Edit </button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}