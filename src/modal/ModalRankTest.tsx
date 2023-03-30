import mole from "../core/Mole";
import { rankDataType } from "../type/Type"

const ModalRankTest = () => {
    const testData = [
        {score: 52, sysdate:'2023/02/12 20:13:20'},
        {score: 24, sysdate:'2023/05/11 15:13:20'},
        {score: 11, sysdate:'2023/02/17 21:13:20'},
        {score: 96, sysdate:'2023/02/28 05:13:20'},
        {score: 112, sysdate:'2023/02/24 16:13:20'}
    ]
    const sortRank = mole.utils.sortArray(testData, 10);

    const tableClickHandler = (item: rankDataType) => {
        mole.setState('rankList', [
            ...mole.getState('rankList'),
            { score: item.score, sysdate: item.sysdate }
        ])
    }

    return (
        <>
        <p>데이터를 선택하시면 테스트 데이터가 반영됩니다.</p>
        <table className="table clearfix" style={{marginBottom: '10%'}}>
            <tbody>
                <tr>
                    <th>점수</th>
                    <th>일시</th>
                </tr>
                {sortRank.map((item: rankDataType) => {
                    return (
                        <tr key={item.score + '-' + item.sysdate}
                            onClick={() => (tableClickHandler(item))}
                        >
                            <td>{`${item.score}점`}</td>
                            <td>{item.sysdate}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default ModalRankTest;