import React from "react";
import { useSelector } from 'react-redux';
import { StoreStateType, SelectPropsType } from '../../type/Type';
import mole from "../../core/Mole";

const Select = (props: SelectPropsType) => {
    const { screenData, row, column, count } = useSelector((state: StoreStateType) => {
        return {
            screenData: state.data.screenData,
            row: state.data.screenData.row,
            column: state.data.screenData.column,
            count: state.data.screenData.count
        }
    });

    // 오픈한 select 정보 가져오기
    const getInfo = () => {    
        return mole.list.screenDataList.find(e => e.value === props.type)
    }

    const selectChangeHandler = (e: any) => {
        // 값 세팅
        mole.setState('screenData', {
            ...screenData, 
            [props.type]: Number(e.target.value)
        });

       // 행, 열이 변경돼서 선택할 수 없는 두더지 수가 되면 두더지 수 리셋
        if (row > 0 && column > 0 && props.type !== 'count') {
            const min = mole.list.moleCountList()[0]?.value;
            const max = mole.list.moleCountList()[mole.list.moleCountList().length -1]?.value;

            if (min >= count || max <= count) {
                mole.setState('screenData', {
                    ...mole.getState('screenData'), 
                    count: 1
                });
            }
        }
    }

    return (
        <div className="select-wrap">
            <div className="select-box">
                <label htmlFor={getInfo()?.value}>{getInfo()?.label}</label>
                <select
                    className="select-text"
                    id={getInfo()?.value} 
                    onChange={selectChangeHandler}
                    value={screenData[props.type]}
                >
                    {props.list.map((item: {value: number, label: number}) => {
                        return <option key={item.value + '-' + item.label} value={item.value}>{item.label}</option>
                    })}
                </select>
            </div>
        </div>
    )
}
export default Select;