import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../type/Type';
import mole from "./../core/Mole";
import useMovePage from "../hooks/useMovePage";
import Select from "../comp/module/Select";
import ButtonGroup from "../comp/module/ButtonGroup";

const Ready = () => {
    const [ setPage ] = useMovePage();
    const { screenData } = useSelector((state: StoreStateType) => {
        return {
            screenData: state.data.screenData
        }
    });

    useEffect(() => {
        // 뒤로가기 진행하는 경우 고려.
        mole.setState('isStart', false);
        mole.setState('timer', 'none');
        mole.module.setScore();
    }, [])

    // 시작 버튼 클릭 이벤트 핸들러
    const btnClickHandler = () => {
        const screenDataValues = Object.values(screenData);
        const screenDataKeys = Object.keys(screenData);
        const emptyValue = screenDataValues.find((value: number) => value === 0);
        const emptyIndex = screenDataValues.findIndex((value: number) => value === 0);
        const emptyLabel = mole.list.screenDataList.find(e => e.value === screenDataKeys[emptyIndex])?.label;

        // 값에 0이 포함되어 있다면 종료
        if (emptyValue === 0) return mole.alert(`${emptyLabel}의 값을 선택해 주세요.`);

        // game 페이지로 이동
        mole.setState('timer', 'start');
        setPage('game')
    };

    return (
        <div className="main">
            <button className='btn-test' onClick={() => (mole.showModal('ModalReadyTest', {confirm: '닫기'}))}>Test</button>
            <div className='intro-wrap'>
                <img className="intro-image" alt="메인 이미지" src="images/intro.png" />
                <div className='intro-box'>
                    <Select type="row" list={mole.list.rowColumnList}/>
                    <Select type="column" list={mole.list.rowColumnList}/>
                    <Select type="count" list={mole.list.moleCountList()}/>
                    <ButtonGroup callback={btnClickHandler}/>
                </div>
            </div>
        </div>
    )
}

export default Ready;