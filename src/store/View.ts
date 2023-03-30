import { initialViewState, AlertOptionType, initAlertOption, ModalOptionType, initModalOption } from './../type/Type';
import { createAction } from "@reduxjs/toolkit";

// types
export const MOVE_PAGE = "view/MOVE_PAGE";
export const SET_COVER = "view/SET_COVER";
export const SHOW_ALERT = "view/SHOW_ALERT";
export const HIDE_ALERT = "view/HIDE_ALERT";
export const SHOW_MODAL = "view/SHOW_MODAL";
export const HIDE_MODAL = "view/HIDE_MODAL";

// actions
export const movePage = createAction<{
    pageName: string;
}>(MOVE_PAGE);
export const showAlert = createAction<{
    message: string;
    alertOption?: AlertOptionType;
}>(SHOW_ALERT);
export const hideAlert = createAction(HIDE_ALERT);
export const showModal = createAction<{
    modalName: string;
    modalOption?: ModalOptionType;
}>(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);

// reducer
const viewReducer = (
    state = initialViewState, 
    action: {type: string, payload?: any}
) => {
    switch (action.type) {
        case MOVE_PAGE:
            return {
                ...state,
                pageName: action.payload.pageName
            }
        case SHOW_ALERT:
            const alertParam: AlertOptionType = action.payload.alertOption;
            const alertOption: AlertOptionType = {
                title: (alertParam && alertParam.title) || '',
                confirm: (alertParam && alertParam.confirm) || '확인',
                cancel: (alertParam && alertParam.cancel) || '',
                param: (alertParam && alertParam.param) || undefined,
                closeHandler: (alertParam && alertParam.closeHandler) || (() => {}),
            };
            return {
                ...state,
                alertMessage: action.payload.message,
                alertOption: alertOption,
                alertShowCheck: true
            };
        case HIDE_ALERT:
            return {
                ...state,
                alertMessage: '',
                alertOption: initAlertOption,
                alertShowCheck: false
            };
        case SHOW_MODAL:
            const popupParam: ModalOptionType = action.payload.modalOption;
            const modalOption: ModalOptionType = {
                confirm: (popupParam && popupParam.confirm) || '',
                param: (popupParam && popupParam.param) || undefined,
                callbackFunc: (popupParam && popupParam.callbackFunc) || (() => {}),
            };
            return {
                ...state,
                modalName: action.payload.modalName,
                modalOption: modalOption,
                isShowModal: true
            }
        case HIDE_MODAL:
            return {
                ...state,
                modalName: '',
                modalOption: initModalOption,
                isShowModal: false
            }
        default:
            return state;
    }
}

export default viewReducer;