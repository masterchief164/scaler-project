import {UserContext} from "../utils/UserContext.jsx";
import {useContext, useEffect} from "react";
import '../stylesheets/Homepage.css'

const Homepage = () => {
    const [,,, setPageNumber] = useContext(UserContext);

    useEffect(() => {
        setPageNumber(0);
    }, []);

    return (
        <>
            <section className={'BannerBox'}>

                <div className={"banner"}>
                    <h2>Welcome to the</h2>
                    <h1>IIITDMJ Evaluation</h1>
                    <h2> Portal!</h2>
                </div>

            </section>
            <div className="itemTags">
                <div className="tag">
                    <h3>Students : {10}</h3>
                </div>
                <div className="tag">
                    <h3>Mentors : {3}</h3>
                </div>
            </div>
        </>
    );
}

export default Homepage;