import { useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs'
import styled, { keyframes, css} from "styled-components";

type AlertType = {
    /** 메시지 */
    message: string;
    /** 버튼 이벤트 핸들러 */
    closeHandler?: Function;
    /** 취소 버튼 명 */
    cancel?: string;
    /** 확인 버튼 명 */
    confirm?: string;
    /** ref */
    ref?: any
}

export const Alert = (manager: AlertType) => {
    const [ isShow, setIsShow ] = useState(false);

    const AlertManager = (props: AlertType) => {
        const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            const id = e.currentTarget.id;
            props?.closeHandler && props?.closeHandler(id);
            setIsShow(false);
        }

        return (
            <>
            <Background visible={isShow} />
                <ModalSection visible={isShow}>
                    <Title>
                        <CloseButton onClick={(e: any) => onClick(e)}>X</CloseButton>
                    </Title>
                    <Content>{props.message}</Content>
                    <div style={{width: '100%'}}>
                        {props?.cancel && <Button ref={props.ref} id="cancel" onClick={(e: any) => onClick(e)}>{props?.cancel}</Button>}
                        {props?.confirm && <Button ref={props.ref} id="confirm" onClick={(e: any) => onClick(e)}>{props?.confirm}</Button>}
                    </div>
            </ModalSection>
            </>
        )
    }

    return (
        <div>
            <button className="btn" onClick={() => (setIsShow(true))}>
                Alert
            </button>
            <AlertManager 
                message={manager.message} 
                confirm={manager.confirm}
                cancel={manager.cancel}
                ref={manager.ref}
                closeHandler={manager.closeHandler}/>
        </div>
    );
    
}

export default {
    component: Alert,
    title: 'Core/Alert',
    decorators: [withKnobs]
    
}

Alert.args = {
    message: '두더지를 잡아볼까요?',
    confirm: '확인',
    cancel: '취소',
    closeHandler: () => {}
}

// animations
const fadeIn = keyframes`
    0% { opacity: 0;}
    100% { opacity: 1; }
`;

const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
`;

// components
const modalSettings = (visible: boolean) => css`
    visibility: ${visible ? 'visible' : 'hidden'};
    z-index: 15;
    animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
    transition: visibility 0.15s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    ${(props) => modalSettings(props.visible)}
`;

const ModalSection = styled.div<{ visible: boolean }>`
    width: 25%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 1);
    padding: 16px;
    ${(props) => modalSettings(props.visible)}
`;

const Title = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 16px;
`;

const Content = styled.div`
    padding: 16px 0 15px 15px;

`;
const Button = styled.div`
    padding: 16px;
    
    float: right;
    flex-direction: row-reverse;
`;

const CloseButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    display: contents;
`;
