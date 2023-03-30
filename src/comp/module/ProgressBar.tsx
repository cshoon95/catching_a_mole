import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../type/Type';
import mole from "../../core/Mole";
import useMovePage from "../../hooks/useMovePage";
import useInterval from "../../hooks/useInterval";

const ProgressBar = () => {
    const { timer, rankList, isStart, gameTime } = useSelector((state: StoreStateType) => {
        return {
            timer: state.data.timer,
            rankList: state.data.rankList,
            isStart: state.data.isStart,
            gameTime: state.data.gameTime
        }
    });
    const [ setPage ] = useMovePage();
    const [ time, setTime ] = useState(gameTime);
    const [ score, setScore ] = useState(0);
    
    useEffect(() => {
        setTime(gameTime);
    }, [gameTime])

    useInterval(() => {
        if (timer === 'start' && isStart) {
            setTime(time - 1);
            setScore(mole.module.getScore());

            if (time === 0) {
                mole.module.stopMole();
                mole.setState('rankList', [...rankList, {score: mole.module.getScore(), sysdate: mole.utils.sysdate(new Date())} ])
                mole.setState('timer', 'end');
                mole.setState('showResult', true);
                mole.setState('score', mole.module.getScore());
                setPage('/rank');
            }
        }
    }, 1000);

    return (
        <>
        <div className='progress-wrap'>
            <span className='progress-score'>{`${score}점`}</span>
            <progress className='progress-bar' value={time} max={60}/>
            <span className='progress-timer'>{`${time}초`}</span>
        </div>
        </>
    )
}

export default React.memo(ProgressBar);