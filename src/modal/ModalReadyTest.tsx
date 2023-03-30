import mole from "../core/Mole";
import { screenDataType } from "../type/Type";

const ModalReadyTest = () => {
    const testData = [
        {row: 2, column:2, count: 1},
        {row: 3, column:3, count: 3},
        {row: 4, column:3, count: 4},
        {row: 5, column:5, count: 8},
        {row: 6, column:6, count: 10}
    ]

    const tableClickHandler = (item: screenDataType) => {
        mole.setState('screenData', {
            row: item.row,
            column: item.column,
            count: item.count
        })
        mole.hideModal();
    }

    return (
        <>
        <p>테스트 데이터를 선택해 주세요.</p>
        <table className="table clearfix" style={{marginBottom: '10%'}}>
            <tbody>
                <tr>
                    {mole.list.screenDataList.map((item: {
                        value: string, 
                        label: string
                    }) => {
                        return <th key={item.value}>{item.label}</th>
                    })}
                </tr>
                {testData.map((item: screenDataType) => {
                    return (
                        <tr key={item.row + '-' + item.column + '-' + item.count}
                            onClick={() => (tableClickHandler(item))}
                        >
                            <td>{item.row}</td>
                            <td>{item.column}</td>
                            <td>{item.count}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default ModalReadyTest