import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { StoreStateType, listInfoType } from '../type/Type';
import mole from "../core/Mole";
import ButtonGroup from "../comp/module/ButtonGroup";
import ButtonReset from "../comp/module/ButtonReset";
import useMovePage from "../hooks/useMovePage";

const Rank = () => {
    const [ setPage ] = useMovePage();
    const { rankList, showResult } = useSelector((state: StoreStateType) => {
        return {
            rankList: state.data.rankList,
            showResult: state.data.showResult
        }
    });

    useEffect(() => {
        // 앞으로가기 진행하는 경우 고려.
        mole.setState('isStart', false);
        mole.setState('timer', 'end');

        // 결과창 
        if (showResult) {
            mole.showModal('ModalResult', { confirm: '확인' });
            mole.setState('showResult', false);
        } 
    }, [])

    const RankTable = () => {
        const sortRank = mole.utils.sortArray(rankList, 10);

        return (
            <table className="table clearfix" >
                <tbody>
                    <tr>
                        {mole.list.rankTableHeadList.map((label: string) => {
                            return <th>{label}</th>
                        })}
                    </tr>
                    {sortRank.map((row: any, rowIdx: number) => {
                        return (
                            <tr key={rowIdx + '-' + row.sysdate}>
                                <td>{rowIdx + 1}</td>
                                <td>{row.score}</td>
                                <td>{row.sysdate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <>
        <button className='btn-test' style={{margin: '5px'}}onClick={() => (
            mole.showModal('ModalRankTest', {
                confirm: '닫기',
                callbackFunc: () => { mole.hideModal(); }
            }
        ))}>Test</button>
        <div className="main">
            <ButtonReset/>
            <RankTable/>
            <ButtonGroup callback={(info: listInfoType) => {
                if (info.nextCode === 'start') {
                    mole.setState('timer', 'start');
                    mole.module.setScore();
                    setPage('/game');
                    return;
                }
                if (info.nextCode === 'stop') return setPage('/');
            }}/>
        </div>
        </>
    )
}

export default Rank;