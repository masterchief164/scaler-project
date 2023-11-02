import {Request, Response} from "express";
import {db} from '../config'
import {MarksInterface} from "../types";
import {validateMarks} from "../services/marks.services";
import {StudentModel} from "../DAL/model";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const students = await db.getAllStudents();


        res.send({
            message: "all working",
            data: students
        })
    } catch (e) {
        res.status(500).send({
            message: "Internal Server Error",
            error: e
        })
    }
};


export const updateMarks = async (req: Request, res: Response) => {

    try {
        const marks = req.body.marks as MarksInterface;
        const studentRoll = req.params.rollNo;

        const valid = validateMarks(marks);
        if (!valid) {
            return res.status(401).send({
                message: "Marks not valid"
            });
        }
        const updatedStudent = await db.updateStudentMarks(marks, studentRoll);
        res.send({
            message: "Marks Updated",
            data: updatedStudent
        });
    } catch (e) {
        res.status(500).send({
            message: "Internal Server Error",
            error: e
        })
    }
};

export const submitMarks = async (req: Request, res: Response) => {
    const students = req.body.students as StudentModel[];

    try {
        let marksValid = true;

        students.forEach(student => {
            if (!(student.field1 != null &&
                student.field2 != null &&
                student.field3 != null &&
                student.field4 != null &&
                student.field5 != null
            ))
                marksValid = false;
        })

        if (!marksValid)
            return res.status(409).send({
                message: "Marks cannot be null"
            })

        const submitted = await db.submitMarks(students);

        if (submitted) {
            res.send({
                message: 'Marks Submitted',
                students: submitted
            });
        } else {
            res.status(400).send({
                message: 'Incorrect Roll Number'
            });
        }
    } catch (e) {
        res.status(500).send({
            message: "Internal Server Error",
            error: e
        })
    }
}
