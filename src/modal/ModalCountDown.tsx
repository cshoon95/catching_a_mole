import { useState, useEffect } from "react";
import mole from "../core/Mole";

const ModalCountDown = () => {
    const [counter, setCounter] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => setCounter(counter - 1), 1000);

        if (counter === -1) {
            mole.setState('timer', 'start');
            mole.hideModal();
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        }
    }, [counter]);

    return (
        <img className="image-pull" 
            alt={`count-down-${counter}`} 
            style={{width: '50%'}}
            src={`/images/count-down-${counter}.png`}/>        
    );
}   

export default ModalCountDown;