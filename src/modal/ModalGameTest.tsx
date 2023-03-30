import mole from "../core/Mole";

const ModalReadyTest = () => {
    const testData = [5, 10, 15, 30, 45, 60, 100];

    const tableClickHandler = (time: number) => {
        mole.setState('gameTime', time);
        mole.hideModal();
    }

    return (
        <>
        <p>테스트 데이터를 선택해 주세요.</p>
        <table className="table clearfix" style={{marginBottom: '10%'}}>
            <tbody>
                <tr>
                    <th>시간</th>
                </tr>
                {testData.map((time: number) => {
                    return (
                        <tr key={time}
                            onClick={() => (tableClickHandler(time))}
                        >
                            <td>{time}초</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default ModalReadyTest;