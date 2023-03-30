import mole from "./Mole";
import { listInfoType, listNumberType, listStringType } from "../type/Type"

export default class List {
    /** 행, 열 드롭다운 리스트 */
    rowColumnList: listNumberType = [
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
    ]

    /** 두더지 수 리스트 */ 
    moleCountList() {
        const maxCount = mole.module.getRowXColumns() / 2;
        const list: listNumberType = [];

        // 행/열 선택 안한 케이스라면 종료
        if (maxCount === 0) return list;
        
        // 최소 1, 최대 (행 x 열) / 2
        for (let i=1; i<maxCount; i++) {
            list.push({value: i, label: i})
        }

        return list;
    }

    /** 인풋 정보 리스트 */
    screenDataList: listStringType = [
        {value: 'row',      label: '행'},
        {value: 'column',   label: '열'},
        {value: 'count',    label: '두더지'},
    ]

    /** 순위 테이블 제목 리스트 */
    rankTableHeadList: string[] = ['순위', '점수', '일시']

    /** 타이머 모드에 따라 가져오는 버튼 리스트 */
    gameBtnList: {
        value?: string, 
        info?: listInfoType[]
    }[] = [
        {value: 'start', info: [
            {label: '일시정지', nextCode: 'pause'},
            {label: '그만하기', nextCode: 'stop'}
        ]},
        {value: 'pause', info: [
            {label: '재개하기', nextCode: 'start'},
        ]},
        {value: 'stop', info: [
            {label: '시작하기', nextCode: 'start'},
        ]},
        {value: 'end', info: [
            {label: '다시하기', nextCode: 'start'},
            {label: '처음으로', nextCode: 'stop'},
        ]},
        {value: 'none', info: [
            {label: '시작하기', nextCode: 'stop'},
        ]}
    ]
}