import { useSelector } from 'react-redux';
import { StoreStateType } from '../../type/Type';
import mole from "../../core/Mole";

const ButtonReset = () => {
    const { rankList } = useSelector((state: StoreStateType) => {
        return { rankList: state.data.rankList }
    });

    const btnClickHandler = () => {
        if (rankList.length === 0) return mole.alert('이미 초기화 되었습니다.');
        
        mole.alert('정말 초기화 하시겠어요?', {
            closeHandler: (id: string) => {
                if (id === 'confirm') mole.setState('rankList', []);
            },
            cancel: '취소',
        })
    }

    return (
        <button className="btn-reset" onClick={btnClickHandler}>
            순위 초기화
        </button>
    )
}

export default ButtonReset;