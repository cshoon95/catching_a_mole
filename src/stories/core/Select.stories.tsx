import { withKnobs } from '@storybook/addon-knobs'

type SelectType = {
    /** 헤드 정보 */
    head: {id: string, label: string};
    /** 옵션 정보 */
    option: {value: string, label: string}[]
    /** change 이벤트 핸들러 */
    changeHandler?: any;
    /** ref */
    ref?: any
}

export const Select = (props: SelectType) => {
    return (
        <div className="select-wrap">
            <div className="select-box" >
                <label htmlFor={props.head.id}>{props.head.label}</label>
                <select
                    className="select-text"
                    id={props.head.id}
                    value={undefined}
                    ref={props.ref}
                >
                    {props.option.map((item: {value: string, label: string}) => {
                        return <option value={item.value}>{item.label}</option>
                    })}
                </select>
            </div>
        </div>
    );
}

export default {
    component: Select,
    title: 'Core/Select',
    decorators: [withKnobs]
}

Select.args = {
    head: {id:'0', label:'두더지 수'},
    option: [
        {value: 10, label: 10},
        {value: 20, label: 20},
        {value: 30, label: 30},
    ],
    changeHandler: () => {}
}