import { withKnobs } from '@storybook/addon-knobs'

type ButtonType = {
    /** 라벨명 */
    label: string;
    /** 버튼 이벤트 핸들러 */
    clickHandler?: any;
    /** ref */
    ref?: any
}

export const Button = (props: ButtonType) => {
    return (
        <button className="btn" ref={props.ref} onClick={props.clickHandler}>
            {props.label}
        </button>
    )
}

export default {
    component: Button,
    title: 'Comp/Button',
    decorators: [withKnobs]   
}

Button.args = {
    label: '순위 초기화',
    clickHandler: () => {}
}