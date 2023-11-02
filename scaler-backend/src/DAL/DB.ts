import {StudentModel} from "./model";
import {MarksInterface} from "../types";

export interface DB {
    getAllStudents(): Promise<StudentModel[]>

    updateStudentMarks(marks: MarksInterface, studentRollNo: string): Promise<StudentModel | null>

    submitMarks(students: StudentModel[]): Promise<StudentModel[]>

    addToGroup(studentRollNos:string[], mentorID: number): Promise<void>

    getStudentsInGroup(mentorID: number):Promise<StudentModel[]> ;
}