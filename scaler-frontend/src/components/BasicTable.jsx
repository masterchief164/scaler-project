import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Alert, Collapse, IconButton, Input} from "@mui/material";
import {Save} from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {saveStudentMarks} from "../api/data.js";

const validateData = (student) => {
    return !(student.field1 === null || student.field1 > 20 || student.field1 < 0 ||
        student.field2 === null || student.field2 < 0 || student.field2 > 20 ||
        student.field3 === null || student.field3 < 0 || student.field3 > 20 ||
        student.field4 === null || student.field4 < 0 || student.field4 > 20 ||
        student.field5 === null || student.field5 < 0 || student.field5 > 20);
}

export default function BasicTable({students, setStudents, setSnackbarOpen}) {

    const [open, setOpen] = useState(null);
    const handleSave = (idx) => {
        if (!validateData(students[idx])) {
            setOpen('Invalid Data! Please check the data and try again.');
            return;
        }
        saveStudentMarks(students[idx]).then(res => {
            if(res){
                setSnackbarOpen('Marks Saved!');
            } else {
                setOpen('Error Occurred! Please try again later.');
            }
        });
    }


    return (
        <>
            <Collapse in={!!open}>
                <Alert severity={'error'}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setOpen(false);
                               }}
                           >
                               <CloseIcon fontSize="inherit"/>
                           </IconButton>
                       }
                       sx={{mb: 2}}
                >
                    {open}
                </Alert>
            </Collapse>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Roll No.</TableCell>
                            <TableCell align="right">Idea</TableCell>
                            <TableCell align="right">Execution</TableCell>
                            <TableCell align="right">Pitch</TableCell>
                            <TableCell align="right">Uniqueness</TableCell>
                            <TableCell align="right">Practicality</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((row, idx) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.roll_no}</TableCell>
                                <TableCell align="right">
                                    <Input type='number' sx={{width: '50px'}}
                                           value={row.field1 === null ? 0 : row.field1}
                                           onChange={(e) => {
                                               e.preventDefault();
                                               setStudents(prevStudents => {
                                                   const tempStudents = JSON.parse(JSON.stringify(prevStudents));
                                                   tempStudents[idx].field1 = parseInt(e.target.value === '' ? 0 : e.target.value);
                                                   return tempStudents
                                               })
                                           }}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Input type='number' sx={{width: '50px'}}
                                           value={row.field2 === null ? 0 : row.field2}
                                           onChange={(e) => {
                                               e.preventDefault();
                                               setStudents(prevStudents => {
                                                   const tempStudents = JSON.parse(JSON.stringify(prevStudents));
                                                   tempStudents[idx].field2 = parseInt(e.target.value === '' ? 0 : e.target.value);
                                                   return tempStudents
                                               })
                                           }}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Input type='number' sx={{width: '50px'}}
                                           value={row.field3 === null ? 0 : row.field3}
                                           onChange={(e) => {
                                               e.preventDefault();
                                               setStudents(prevStudents => {
                                                   const tempStudents = JSON.parse(JSON.stringify(prevStudents));
                                                   tempStudents[idx].field3 = parseInt(e.target.value === '' ? 0 : e.target.value);
                                                   return tempStudents
                                               })
                                           }}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Input type='number' sx={{width: '50px'}} max={20}
                                           value={row.field4 === null ? 0 : row.field4} onChange={(e) => {
                                        e.preventDefault();
                                        setStudents(prevStudents => {
                                            const tempStudents = JSON.parse(JSON.stringify(prevStudents));
                                            tempStudents[idx].field4 = parseInt(e.target.value === '' ? 0 : e.target.value);
                                            return tempStudents
                                        })
                                    }}/>
                                </TableCell>
                                <TableCell align="right">
                                    <Input type='number' sx={{width: '50px'}}
                                           value={row.field5 === null ? 0 : row.field5}
                                           onChange={(e) => {
                                               e.preventDefault();
                                               setStudents(prevStudents => {
                                                   const tempStudents = JSON.parse(JSON.stringify(prevStudents));
                                                   tempStudents[idx].field5 = parseInt(e.target.value === '' ? 0 : e.target.value);
                                                   return tempStudents
                                               })
                                           }}/>
                                </TableCell>
                                <TableCell
                                    align="right">{isNaN(row.field1 + row.field2 + row.field3 + row.field4 + row.field5) ?
                                    0 : (row.field1 + row.field2 + row.field3 + row.field4 + row.field5)}</TableCell>

                                <TableCell align="right">
                                    <IconButton disabled={row.submitted}
                                                onClick={() => handleSave(idx)}><Save/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
