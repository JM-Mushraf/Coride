import React, { useEffect } from 'react';
import "./coridetxt.css";

const Coridetxt = () => {
    useEffect(() => {
        function restartAnimation() {
            const textWrapper = document.getElementById('textWrapper');
            if (textWrapper) {
                textWrapper.classList.remove('text-wrapper');
                void textWrapper.offsetWidth; // Trigger reflow
                textWrapper.classList.add('text-wrapper');
            }
        }

        const intervalId = setInterval(restartAnimation, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='txt_wrap'>
            <div className="text-wrapper" id="textWrapper">
                <span>C</span>
                <span>O</span>
                <span>R</span>
                <span>I</span>
                <span>D</span>
                <span>E</span>
            </div>
        </div>
    );
};

export default Coridetxt;
