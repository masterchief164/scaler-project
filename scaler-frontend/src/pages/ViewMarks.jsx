import React, {useContext, useEffect} from "react";
import '../stylesheets/ViewMarks.css'
import Banner from "../components/Banner.jsx";
import ShowStudents from "../components/ShowStudent.jsx";
import {UserContext} from "../utils/UserContext.jsx";

const ViewMarks = () => {
    const [,,, setPageNumber] = useContext(UserContext);

    useEffect(() => {
        setPageNumber(2);
    }, []);

    return (
        <section className={'lostContainer'}>
            <Banner title={'View Marks'}/>
            <ShowStudents/>
        </section>
    );
}
export default ViewMarks;