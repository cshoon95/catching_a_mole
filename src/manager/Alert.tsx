import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../type/Type';
import styled, { keyframes, css} from "styled-components";
import mole from '../core/Mole';

const Alert = () => {
    const cancelRef = useRef<any>(null);
    const confirmRef = useRef<any>(null);
    const { alertMessage, alertOption, alertShowCheck } = useSelector(
        (state: StoreStateType) => {
            return {
                alertMessage: state.view.alertMessage,
                alertOption: state.view.alertOption,
                alertShowCheck: state.view.alertShowCheck
            };
        },
    );

    useEffect(() => {
        const focus = setTimeout(() => {
            confirmRef.current?.focus();
        }, 1000);

        return () => { clearInterval(focus) }
    }, [alertMessage]);

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
        alertOption?.closeHandler && alertOption?.closeHandler(id);
        mole.alert('hide'); 
    }

    return (
        <>
        <Background visible={alertShowCheck} />
            <ModalSection visible={alertShowCheck}>
                <Title>
                    <CloseButton onClick={(e: any) => onClick(e)}>X</CloseButton>
                </Title>
                <Content>{alertMessage}</Content>
                <div style={{width: '100%'}}>
                    {alertOption?.cancel && <Button ref={cancelRef} id="cancel" onClick={(e: any) => onClick(e)}>{alertOption?.cancel}</Button>}
                    {alertOption?.confirm && <Button ref={confirmRef} id="confirm" onClick={(e: any) => onClick(e)}>{alertOption?.confirm}</Button>}
                </div>
        </ModalSection>
        </>
    );
    
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

export default Alert;