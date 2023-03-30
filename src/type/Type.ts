// Store Type
export type StoreStateType = {
    data: StoreStateDataType;
    view: StoreStateViewType;
}

// Data Type
export type StoreStateDataType = {
    screenData: screenDataType; // 두더지 굴 정보
    score: number;              // 점수
    totalCount: number;         // 출현한 총 두더지 개수
    rankList: {score: number, sysdate: string}[],
    showResult: boolean;        // 결과창 확인 여부
    isStart: boolean;           // 게임 시작 여부
    gameTime: number;           // 게임 시간
    timer: 'start'              // 타이머
        | 'pause' 
        | 'stop' 
        | 'resume' 
        | 'end' 
        | 'none' 
}

// View Type
export type StoreStateViewType = {
    // 현재 열려있는 화면
    pageName: string;
    // 얼럿 
    alertMessage?: string;
    alertOption?: AlertOptionType;
    alertShowCheck: boolean;
    // 모달
    modalName: string;
    isShowModal: boolean;
    modalOption: ModalOptionType;
}

// Option Type
export type AlertOptionType = {
    title?: string;
    confirm?: string;
    cancel?: string;
    param?: any;
    closeHandler?: Function;
};
export type ModalOptionType = {
    confirm?: string;
    param?: any;
    callbackFunc?: Function;
}

// Init
export const initAlertOption: AlertOptionType = {
    title: '',
    confirm: '확인',
    cancel: '',
    param: {},
    closeHandler: () => {}
};
export const initModalOption: ModalOptionType = {
    confirm: '확인',
    param: {},
    callbackFunc: () => {},
}
export const initialDataState: StoreStateDataType = {
    screenData: {
        row: 4,
        column: 4,
        count: 4
    },
    score: 0,
    totalCount: 0,
    timer: 'none',
    rankList: [],
    showResult: false,
    isStart: false,
    gameTime: 60
}
export const initialViewState: StoreStateViewType = {
    pageName: '',
    alertMessage: '',
    alertOption: initAlertOption,
    alertShowCheck: false,
    modalName: '',
    isShowModal: false,
    modalOption: initModalOption
}

// normal Type
export interface listInfoType {
    label: string, 
    nextCode: string
}
export interface screenDataType {
    row: number;    // 행
    column: number; // 열
    count: number;  // 출현할 두더지 개수
}
export type listNumberType = {
    value: number, 
    label: number
}[]
export type listStringType = {
    value: string, 
    label: string
}[]
export type rankDataType = {
    score: number,
    sysdate: string
}
export type SelectPropsType = {
    type: 'row' | 'column' | 'count';
    list: listNumberType
}