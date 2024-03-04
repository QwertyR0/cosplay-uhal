import React, { useEffect, useState } from "react";
import "./Results.css"

function Results(args) {
    // const [status, setStatus] = args.props;
    const [displayed, setDisplayed] = useState(0);

    const status = {
        value: [
            {
                contestant: "Oğuz Kağan Ayar",
                score: 100,
            },
            {
                contestant: "Ali Veli",
                score: 90,
            },
            {
                contestant: "Ayşe Fatma",
                score: 80,
            },
        ],  
    }

    useEffect(() => {
        let interval = setInterval(() => {
            setDisplayed(displayed => (displayed + 1) % status.value.length);
            let nameHolder = document.querySelector(".nameHolder");
            nameHolder.classList.remove("animSlide");
            void nameHolder.offsetWidth;
            nameHolder.classList.add("animSlide");
            let podiumBlock = document.querySelector(".podiumBlock");
            podiumBlock.classList.remove("animSlide");
            void podiumBlock.offsetWidth;
            podiumBlock.classList.add("animSlide");
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, []);
    
    return (
        <div className="container">
            <h2>Podyum:</h2>
            <div className="results">
                <div>
                    <div className="nameHolder animSlide">
                        <h3 style={{marginBottom: 0}}>{displayed + 1}.</h3>
                        <p>{status.value[displayed].contestant}</p>
                    </div>
                    <div className="podiumBlock animSlide">
                        <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: displayed === 0 ? 'gold' : displayed === 1 ? 'silver' : displayed === 2 ? '#CD7F32' : 'black' }} viewBox="0 0 576 512">
                            <path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8c23.4 6.5 39.4 26 39.4 45.6c0 20.9-17 37.9-37.9 37.9H192c-17.7 0-32 14.3-32 32s14.3 32 32 32H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H357.9C337 448 320 431 320 410.1c0-19.6 15.9-39.2 39.4-45.6c39.9-11 93.9-32.7 138.2-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM48.9 112h84.4c9.1 90.1 29.2 150.3 51.9 190.6c-24.9-11-50.8-26.5-73.2-48.3c-32-31.1-58-76-63-142.3zM464.1 254.3c-22.4 21.8-48.3 37.3-73.2 48.3c22.7-40.3 42.8-100.5 51.9-190.6h84.4c-5.1 66.3-31.1 111.2-63 142.3z"/>
                        </svg>
                        <p>Puan: {status.value[displayed].score}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results;