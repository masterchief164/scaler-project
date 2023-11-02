import React from "react";
import '../stylesheets/Banner.css'

const Banner = ({title}) => {
    return (
        <div className={'lostItems'}>
            <div className="lostpage-banner">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default Banner;