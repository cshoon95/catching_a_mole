import { useEffect } from "react";
import { listInfoType } from '../type/Type';
import mole from "./../core/Mole";
import ProgressBar from "../comp/module/ProgressBar";
import TableGame from "../comp/module/TableGame";
import useMovePage from "../hooks/useMovePage";
import ButtonGroup from "./../comp/module/ButtonGroup";

const Game = () => {
    const [ setPage ] = useMovePage();

    useEffect(() => {
        mole.showModal('ModalCountDown');
        
        // 카운트 다운 종료 후 실행
        const id = setTimeout(() => {
            mole.setState('isStart', true);
            mole.module.playingMole();
        }, 4000)

        return () => {
            clearTimeout(id);
        }
    }, [])

    const btnClickHandler = (info: listInfoType) => {
        switch(info.nextCode) {
            case 'start':
                mole.showModal('ModalCountDown');

                // 카운트 다운 종료 후 실행
                setTimeout(() => {
                    mole.module.playingMole();
                }, 4000)
                break;

            case 'pause':
                mole.setState('timer', info.nextCode);
                mole.module.stopMole();
                break;

            case 'stop':
                mole.module.stopMole();
                mole.setState('isStart', false);

                mole.alert('정말 그만하시겠어요?', {
                    confirm: '네',
                    cancel: '아니요',
                    closeHandler: (res: any) => {
                        if (res === 'confirm') {
                            mole.setState('timer', 'none');
                            mole.module.setScore();
                            setPage('/'); 
                        } else {
                            mole.showModal('ModalCountDown');

                            // 카운트 다운 종료 후 실행
                            setTimeout(() => {
                                mole.setState('isStart', true);
                                mole.module.playingMole();
                            }, 4000)
                        }
                    }
                })
                break;
        }
    }

    return (
        <div className="main">
            <button className='btn-test' onClick={() => (mole.showModal('ModalGameTest', {confirm: '닫기'}))}>Test</button>
            <ProgressBar />
            <TableGame/>
            <ButtonGroup callback={(info: listInfoType) => (btnClickHandler(info))}/>
        </div>
    )
}

export default Game;