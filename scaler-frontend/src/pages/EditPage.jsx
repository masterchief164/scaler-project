import '../stylesheets/EditPage.css'
import React, {useEffect, useState} from "react";
import {UserContext} from "../utils/UserContext.jsx";
import BasicTable from "../components/BasicTable.jsx";
import {Alert, Button, Container, Snackbar} from "@mui/material";
import {Edit, Lock} from "@mui/icons-material";
import Banner from "../components/Banner.jsx";
import {getStudentsInGroup, submitStudentsMarks} from "../api/data.js";
import TransitionsModal from "../components/TransitionsModal.jsx";


const EditPage = () => {

    const [, , , setPageNumber] = React.useContext(UserContext);
    const [students, setStudents] = React.useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(null);
    const [snackbarError, setSnackbarError] = React.useState(null);
    const [modalOpen, setModalOpen] = useState(false)

    const handleClose = () => {
        setSnackbarOpen(null);
    }

    const handleErrorClose = () => {
        setSnackbarError(null)
    }

    const lockMarks = () => {
        submitStudentsMarks(students, setStudents).then(res => {
            if (res) {
                setSnackbarOpen("Marks Locked");
            } else {
                setSnackbarError("Marks Lock failed! Please check data")
            }
        });

    }

    const selectStudents = ()=>{
        setModalOpen(true)
    }

    useEffect(() => {
        setPageNumber(1);
        getStudentsInGroup(1, setStudents);
    }, []);

    useEffect(()=> {
        getStudentsInGroup(1, setStudents);
    }, [modalOpen])

    return (
        <section className={'lostContainer'}>
            <Banner title={'Edit Marks'}/>
            <TransitionsModal setModalOpen={setModalOpen} modalOpen={modalOpen}  setSnackbarOpen={setSnackbarOpen}/>
            <div className={'table'}>
                <BasicTable students={students} setStudents={setStudents} setSnackbarOpen={setSnackbarOpen}/>
            </div>
            <Container>
                <div className={'buttonContainer'}>
                    <Button sx={{marginX: '10px'}} startIcon={<Edit/>} onClick={selectStudents}>Select Students</Button>
                    <Button sx={{marginX: '10px'}} endIcon={<Lock/>} onClick={lockMarks}>Lock Marks</Button>
                </div>
            </Container>
            <Snackbar open={!!snackbarOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={'success'} sx={{width: '100%'}}>
                    {snackbarOpen}
                </Alert>
            </Snackbar>
            <Snackbar open={!!snackbarError} autoHideDuration={2000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity={'error'} sx={{width: '100%'}}>
                    {snackbarError}
                </Alert>
            </Snackbar>
        </section>
    )
}

export default EditPage;