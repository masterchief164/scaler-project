import axios from "axios";


const baseURL = import.meta.env.VITE_BACKEND_URL;
const getAllStudents = async (setStudents) => {
    try {

        const res = await axios.get(`${baseURL}/student`);
        setStudents(res.data.data);

    } catch (err) {
        console.log(err);
    }
}


const saveStudentMarks = async (student) => {
    try {
        await axios.put(`${baseURL}/student/${student.roll_no}`, {
            marks: {
                field1: student.field1,
                field2: student.field2,
                field3: student.field3,
                field4: student.field4,
                field5: student.field5,
            }
        });
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getStudentsInGroup = async (mentorID, setStudents) => {
    try {
        const res = await axios.get(`${baseURL}/group/${mentorID}`);
        setStudents(res.data.data);
    } catch (e) {
        console.log(e);
    }
}

const submitStudentsMarks = async (students, setStudents) => {
    try {
        const res = await axios.patch(`${baseURL}/student`, {
            students: students
        });
        setStudents(res.data.students);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

const submitStudentGroup = async (students, mentorId) => {
    try {
        const studentRollNos = [];
        students.forEach(student => {
            if(student.id === 1)
                studentRollNos.push(student.roll_no);
        })
        await axios.post(`${baseURL}/group/${mentorId}`, {
            studentRollNos,
            mentorId,
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export {getAllStudents, saveStudentMarks, getStudentsInGroup, submitStudentsMarks, submitStudentGroup};