import express from "express";
import {addStudentsToGroups, getStudentsInGroup} from "../controllers";

export const memberRouter = express.Router();

memberRouter.post('/:mentorId', addStudentsToGroups);
memberRouter.get('/:mentorId', getStudentsInGroup);