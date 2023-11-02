import React, {useEffect, useState} from "react";
import {Backdrop, Box, Button, Container, Fade, Modal} from "@mui/material";
import {getAllStudents, submitStudentGroup} from "../api/data.js";
import {Edit} from "@mui/icons-material";
import SelectorTable from "./SelectorTable.jsx";


const TransitionsModal = ({modalOpen, setModalOpen, setSnackbarOpen}) => {


    const handleClose = () => setModalOpen(false);
    const [students, setStudents] = useState([]);
    const [studentsCpy, setStudentsCpy] = useState(students);


    const style = {
        position: 'absolute',
        borderRadius: '24px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'scroll'
    };


    const handleSelect = () => {
        let count = 0;

        studentsCpy.map(student => {
            if (student.id === 1) count++;
        })

        if (count < 3)
            setSnackbarOpen("Can't set less than 3 students")
        else if (count > 4)
            setSnackbarOpen("Can't set less than 3 students")

        submitStudentGroup(studentsCpy, 1).then(() => setModalOpen(false));

    }

    useEffect(() => {
        getAllStudents(setStudents);
    }, [])

    useEffect(() => {
        setStudentsCpy(students)
    }, [students]);
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={modalOpen}>
                    <Container>
                        <Box sx={style}>
                            <SelectorTable students={students} studentsCpy={studentsCpy} setStudentsCpy={setStudentsCpy}
                                           setSnackbarOpen={setSnackbarOpen}/>
                            <div className={'buttonContainer'}>
                                <Button sx={{marginX: '10px'}} startIcon={<Edit/>} onClick={handleSelect}>Select
                                    Students
                                </Button>
                            </div>
                        </Box>

                    </Container>
                </Fade>
            </Modal>
        </div>
    );
}

export default TransitionsModal