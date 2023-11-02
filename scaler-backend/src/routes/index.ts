import express from "express";

import {studentRouter} from "./student.route";
import {memberRouter} from "./members.route";


export const router = express.Router();

router.use('/student', studentRouter)
router.use('/group', memberRouter)