import { withKnobs } from '@storybook/addon-knobs'
import { useState, useEffect } from "react";

type ProgressbarType = {
    /** 설정할 값 */
    time: number;
}

export const ProgressBar = (manager: ProgressbarType) => {
    const [ isShow, setIsShow ] = useState(false);

    const ProgressBarManager = (props: ProgressbarType) => {
        const [ timer, setTimer ] = useState(props.time);
    
        useEffect(() => {
            if (isShow) {
                const id = setInterval(() => {
                    setTimer(timer - 1);
                }, 1000);

                return () =>  {
                    if (timer ===0) {
                        clearInterval(id);
                    }
                }
            } 
    
        }, [timer]);
    
        setInterval(() => {
            const id = setTimer(timer - 1);
        }, 1000);
    
        return (
            <div className='progress-wrap'>
                <progress className='progress-bar' value={timer} max={props.time}/>
                <span className='progress-timer'>{`${timer}초`}</span>
            </div>
        )
    }

    return (
        <>
        <button className="btn" onClick={() => (setIsShow(!isShow))}>
            초기화
        </button>
        <ProgressBarManager time={manager.time}/>
        </>
    ) 
}
export default {
    component: ProgressBar,
    title: 'Comp/ProgressBar',
    decorators: [withKnobs]
    
}

ProgressBar.args = {
    time: 60
}
