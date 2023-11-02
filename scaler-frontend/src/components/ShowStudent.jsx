import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllStudents } from '../api/data';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ShowStudents() {
    const [studentsData, setStudentsData] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([])
    const [filter, setFilter] = useState('All')


    useEffect(() => {
        getAllStudents(setStudentsData);

    }, [])

    useEffect(() => {
        const tempStudents = JSON.parse(JSON.stringify(studentsData))
        if (filter === 'Assigned') {
            const filtered = tempStudents.filter((student) => {
                return student.submitted
            })
            setFilteredStudents(filtered)
        } else if (filter === 'UnAssigned') {
            const filtered = tempStudents.filter((student) => {
                return !student.submitted
            })
            setFilteredStudents(filtered)
        } else {
            setFilteredStudents(tempStudents)
        }
    }, [studentsData, filter])

    return (
        <div style={{marginBottom: '3rem'}}>
            <div style={{margin: "1rem auto", width: "15`rem"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        label="Age"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Assigned">Assigned Students</MenuItem>
                        <MenuItem value="UnAssigned">Unassigned Students</MenuItem>
                    </Select>
                </FormControl>

            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Roll No</StyledTableCell>
                            <StyledTableCell align="center">Idea</StyledTableCell>
                            <StyledTableCell align="center">Execution</StyledTableCell>
                            <StyledTableCell align="center">Pitch</StyledTableCell>
                            <StyledTableCell align="center">Uniqueness</StyledTableCell>
                            <StyledTableCell align="center">Practicality</StyledTableCell>
                            <StyledTableCell align="center">Total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredStudents.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell>{row.roll_no}</StyledTableCell>
                                <StyledTableCell align="center">{row.field1 ? row.field1 : 0}</StyledTableCell>
                                <StyledTableCell align="center">{row.field2 ? row.field2 : 0}</StyledTableCell>
                                <StyledTableCell align="center">{row.field3 ? row.field3 : 0}</StyledTableCell>
                                <StyledTableCell align="center">{row.field4 ? row.field4 : 0}</StyledTableCell>
                                <StyledTableCell align="center">{row.field5 ? row.field5 : 0}</StyledTableCell>
                                <StyledTableCell align="center">{isNaN(row.field1 + row.field2 + row.field3 + row.field4 + row.field5) ?
                                    0 : (row.field1 + row.field2 + row.field3 + row.field4 + row.field5)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}