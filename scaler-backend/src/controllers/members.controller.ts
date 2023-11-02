import {Request, Response} from "express";
import {db} from '../config'

export const addStudentsToGroups = async (req: Request, res: Response) => {
    const studentRollNos: string[] = req.body.studentRollNos;
    const mentorID = parseInt(req.params.mentorId.trim());

    try {

        if (studentRollNos.length < 3 && studentRollNos.length !== 0)
            return res.status(409).send({
                message: 'Cannot have less than 3 mentees'
            });
        else if (studentRollNos.length > 4)
            return res.status(409).send({
                message: 'Cannot have more than 4 mentees'
            });

        await db.addToGroup(studentRollNos, mentorID);

        res.send({
            message: "Students added to the mentor's group",
        });
    } catch (e: any) {
        res.status(500).send({
            message: 'Unknown error occurred',
            error: e
        })
    }
}

export const getStudentsInGroup = async (req: Request, res: Response) => {
    const mentorID = parseInt(req.params.mentorId.trim());

    try {
        const students = await db.getStudentsInGroup(mentorID);

        res.send({
            message: "all working",
            data: students
        })
    } catch (e: any) {
        res.status(500).send({
            message: "Internal Server Error",
            error: e
        })
    }
}
