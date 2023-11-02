import express from "express";
import {getUsers, submitMarks, updateMarks} from '../controllers';

export const studentRouter = express.Router();


studentRouter.get('/', getUsers);
studentRouter.put('/:rollNo', updateMarks);
studentRouter.patch('/', submitMarks);
