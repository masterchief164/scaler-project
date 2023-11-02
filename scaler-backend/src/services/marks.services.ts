import {MarksInterface, MarksProperties} from "../types";


type AssignedMarksInterface = Record<MarksProperties, number>

export const validateMarks = (marks: MarksInterface): boolean => {
    try {
        const marksRange: AssignedMarksInterface = {
            field1: 20,
            field2: 20,
            field3: 20,
            field4: 20,
            field5: 20
        };

        const assignedMarks = marks as AssignedMarksInterface;

        let valid = true;

        let property: keyof MarksInterface;
        for (property in marksRange)
            if (assignedMarks[property] > marksRange[property]) valid = false;

        return valid;
    } catch (e) {
        return false;
    }
}