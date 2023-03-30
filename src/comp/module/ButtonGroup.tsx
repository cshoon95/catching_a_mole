import React from "react";
import { useSelector } from 'react-redux';
import { StoreStateType, listInfoType } from '../../type/Type';
import mole from "../../core/Mole";

const ButtonGroup = (props: {callback?: Function}) => {
    const { timer } = useSelector((state: StoreStateType) => {
        return { timer: state.data.timer }
    });

    // 현재 타이머에 따른 버튼 리스트
    const list = mole.list.gameBtnList.find(e => e.value === timer);

     // 준비화면 && 타이머 꺼져있을 때 사용되는 스타일
    const readyViewStyle = () => {
        if (timer === 'none') {
            const info = {
                wrap: { transform: `translate(${0}px, ${0}px)` },
                btn: { width: '100%' as any }
            }

            return info;
        }
    }
    
    const btnClickHandler = (info: listInfoType) => {
        props.callback && props.callback(info);
    }

    return (
        <div className="btn-wrap" style={readyViewStyle()?.wrap}>
            {list?.info?.map((item: listInfoType, idx: number) => {
                return (
                    <button type="button" 
                            className="btn-group"
                            style={readyViewStyle()?.btn}
                            key={item + '-' + idx}
                            onClick={() => (btnClickHandler(item))}
                    >{item.label}</button>
                )
            })}
        </div>
    )
}

export default ButtonGroup