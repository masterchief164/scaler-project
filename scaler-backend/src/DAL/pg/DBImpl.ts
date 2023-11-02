import {Pool, QueryResult} from 'pg'
import {StudentModel} from "../model";
import {MarksInterface} from '../../types'

export class DBImpl {
    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getAllStudents(): Promise<StudentModel[]> {
        try {
            const res: QueryResult = await this.pool.query('select * from student full outer join members ON members.roll_no = student.roll_no')
            return DBImpl.mapStudentResult(res);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async getStudentsInGroup(mentorID: number): Promise<StudentModel[]> {
        try {
            const res: QueryResult = await this.pool.query('select * from student full outer join members ON members.roll_no = student.roll_no WHERE members.id=$1', [mentorID])
            return DBImpl.mapStudentResult(res);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async updateStudentMarks(marks: MarksInterface, studentRollNo: string): Promise<StudentModel | null> {
        try {
            const res: QueryResult = await this.pool.query(
                'UPDATE student SET field1=$1, field2=$2, field3=$3, field4=$4, field5=$5 WHERE roll_no=$6 RETURNING *',
                [...Object.values(marks), studentRollNo]);
            const result = DBImpl.mapStudentResult(res);
            if (result.length) return result[0];
            else return null;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async submitMarks(students: StudentModel[]): Promise<StudentModel[]> { // TODO: need trigger for submit
        try {

            const res: QueryResult = await this.pool.query(
                `UPDATE student SET submitted=true WHERE roll_no=ANY($1) RETURNING *`,
                [[...students.map(s => s.roll_no)]]);
            return DBImpl.mapStudentResult(res);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    async addToGroup(studentRollNos: string[], mentorID: number): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');

            await client.query(`LOCK TABLE members IN EXCLUSIVE MODE`)

            await client.query('DELETE FROM members WHERE id=$1', [mentorID]);

            await Promise.all(studentRollNos.map(rollNo =>
                client.query('INSERT INTO members(id, roll_no) values($1,$2)',
                    [mentorID, rollNo])));

            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            console.error(e);
            throw e;
        } finally {
            client.release();
        }
    }

    private static mapStudentResult = (
        res: QueryResult
    ): StudentModel[] =>
        res.rows.map((r) => ({
            name: r.name,
            roll_no: r.roll_no,
            submitted: r.submitted,
            field1: r.field1,
            field2: r.field2,
            field3: r.field3,
            field4: r.field4,
            field5: r.field5,
            id: r.id
        } as StudentModel));
}