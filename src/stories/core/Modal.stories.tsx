import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs'
import "./../common.css";

type ModalType = {
    /** 오픈할 팝업 El */
    children: React.ReactElement;
    /** 모달 닫히면 실행되는 이벤트 */
    closeHandler?: Function;
    /** 확인 버튼 명 */
    confirm?: string;
    /** ref */
    ref?: any
}

export const Modal = (manager: ModalType) => {
    const [ isShow, setIsShow ] = useState(false);

    const ModalManager = (props: ModalType) => {
        const btnClickHandler = () => {
            props.closeHandler && props.closeHandler();
            setIsShow(false);
        }

        return (
            <>
            { isShow && 
            <div className="modal">
                <div className={"modal-body"}>
                    {props.children}
                    {props?.confirm && 
                        <button className="button" 
                                onClick={btnClickHandler}
                                ref={props.ref}
                        >{props?.confirm}</button>
                    }
                </div>                
            </div>
            }
            </>
        )
    }

    return (
        <div>
            <button className="btn" onClick={() => (setIsShow(true))}>
                Modal
            </button>
            <ModalManager 
                children={manager.children} 
                confirm={manager.confirm}
                ref={manager.ref}
                closeHandler={manager.closeHandler}/>
        </div>
    );
    
}

export default {
    component: Modal,
    title: 'Core/Modal',
    decorators: [withKnobs]
}

Modal.args = {
    children: <p>children</p>,
    confirm: '확인',
    callbackFunc: () => {}
}