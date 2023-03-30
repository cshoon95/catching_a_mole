import { Store } from "redux";
import { initialDataState, initialViewState, StoreStateType, AlertOptionType, ModalOptionType } from './../type/Type';
import { movePage, showAlert, hideAlert, showModal, hideModal } from "../store/View";
import { setState } from "../store/Data";
import List from "./List";
import Utils from "./Utils";
import Module from "./Module";

type StateType = keyof typeof initialDataState | keyof typeof initialViewState;

export class Mole {
    private _store!: Store;

    /**
     * Store 초기화.
     * @param inStore Store
     */
    public init(inStore: Store) {
        this._store = inStore;
    }

    public get store() {
        return this._store;
    }

    public set store(inStore: Store) {
        this.store = inStore;
    }

    public get state(): StoreStateType {
        return this.store.getState()
    }
    
    /** list 확장 */
    public get list() {
        return new List();
    }

    /** Utils 확장 */
    public get utils() {
        return new Utils();
    }
    
    /** Module 확장 */
    public get module() {
        return new Module();
    }
    
    /**
     * 얼럿 모달 오픈 
     * @param message 메시지
     * @param option 옵션
     * 
     * @see
     * message === 'hide' 는 모달 닫기
     */
    public alert(message: string, option?: AlertOptionType) {
        (message === 'hide') ? this._store.dispatch(hideAlert()) : this._store.dispatch(showAlert({ message, alertOption: option }))
        
        option && console.log(message + '의 옵션 값: ', option);
    }

    /**
     * 모달 열기
     * @param name 모달명  
     * @param option 모달 옵션
     */
    public showModal(name: string, option?: ModalOptionType) {
        this._store.dispatch(showModal({
            modalName: name,
            modalOption: option
        }))

        option && console.log(name + '의 옵션 값: ', option);
    }

    /** 모달 닫기 */
    public hideModal() {
        this._store.dispatch(hideModal())
    }

    /**
     * 스토어에 있는 상태 값 가져오기.
     * @param key DataStateType | viewStateType 키
     * @param type data | view
     * @returns 키의 값
     */
    public getState(key: StateType, type: string = 'data') {
        return this.store.getState()[type][key];
    }

    /**
     * 스토어에 있는 Data 상태 값 변경.
     * @param key StateType 데이터에 등록되어있는 타입
     * @param value 바꿀 값
     */
    public setState(key: StateType, value: any): void {
        this.store.dispatch(setState(
            { [key]: value }
        ));
    }

    /**
     * 페이지 이동하기.
     * @param path 이동할 페이지
     */
    public movePage(path: string) {
        this.store.dispatch(movePage({
            pageName: path
        }))
    }
}

// 개발자도구 디버깅 안걸고, 값 확인할 때를 위해 추가
const mole = (window as any).devmole = new Mole();
export default mole;