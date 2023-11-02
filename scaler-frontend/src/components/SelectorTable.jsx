import {useEffect, useState} from "react";
import {Alert, Checkbox, Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from "react";

const SelectorTable = ({setStudentsCpy, studentsCpy}) => {
    const [open, setOpen] = useState(null);
    const label = {inputProps: {'aria-label': 'Checkbox demo'}};

    useEffect(() => {
        console.log(studentsCpy)
    }, [studentsCpy]);


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
                            <TableCell align="right">Select</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {studentsCpy.map((row, idx) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.roll_no}</TableCell>
                                <TableCell align="right">{row.field1 ? row.field1 : 0}</TableCell>
                                <TableCell align="right">{row.field2 ? row.field2 : 0}</TableCell>
                                <TableCell align="right">{row.field3 ? row.field3 : 0}</TableCell>
                                <TableCell align="right">{row.field4 ? row.field4 : 0}</TableCell>
                                <TableCell align="right">{row.field5 ? row.field5 : 0}</TableCell>
                                <TableCell
                                    align="right">{isNaN(row.field1 + row.field2 + row.field3 + row.field4 + row.field5) ?
                                    0 : (row.field1 + row.field2 + row.field3 + row.field4 + row.field5)}</TableCell>

                                <TableCell align="right">
                                    <Checkbox {...label} disabled={row.id !== 1 && row.id != null} checked={row.id != null} size="small" onClick={() => {
                                        setStudentsCpy(prevStudents => {
                                            const tempStudents = JSON.parse(JSON.stringify(prevStudents));
                                            tempStudents[idx].id = tempStudents[idx].id === 1 ? null : 1;
                                            return tempStudents
                                        })
                                    }}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default SelectorTable;