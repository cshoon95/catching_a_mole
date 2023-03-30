import { useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { StoreStateType } from '../type/Type';
import mole from "../core/Mole";
import ModalCountDown from "../modal/ModalCountDown";
import ModalResult from "../modal/ModalResult";
import ModalReadyTest from "../modal/ModalReadyTest";
import ModalGameTest from "../modal/ModalGameTest";
import ModalRankTest from "../modal/ModalRankTest";

const Modal = () => {
    const refBtn = useRef<HTMLButtonElement>(null);
    const { modalName, modalOption, isShowModal } = useSelector((state: StoreStateType) => {
        return {
            modalName: state.view.modalName,
            modalOption: state.view.modalOption,
            isShowModal: state.view.isShowModal,
        };
    });

    
    const loadPopup = () => { 
        switch (modalName) {
            case 'ModalCountDown':  return <ModalCountDown/>;
            case 'ModalResult':     return <ModalResult/>;
            case 'ModalReadyTest':  return <ModalReadyTest/>;
            case 'ModalGameTest':   return <ModalGameTest/>;
            case 'ModalRankTest':   return <ModalRankTest/>;
            default: return;
        }
    }

    useEffect(() => {
        const focus = setTimeout(() => {
            refBtn.current?.focus();
        }, 1000);

        return () => { clearInterval(focus) }
    }, []);

    return (
        <>
        { isShowModal && 
            <div className="modal">
                <div className={modalName === 'ModalCountDown' ? "modal-countdown-body" : "modal-body"}>
                    {loadPopup()}
                    {modalOption?.confirm && 
                        <button className="button" 
                                onClick={() => {
                                    modalOption.callbackFunc && modalOption.callbackFunc();
                                    mole.hideModal()}
                                }
                                ref={refBtn}
                        >{modalOption?.confirm}</button>
                    }
                </div>                
            </div>
        }
        </>
    );
}

export default Modal;