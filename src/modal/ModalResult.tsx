import mole from "../core/Mole";

const ModalResult = () => {
    // 점수 분리
    const scoreSplit = () => {
        const list = [];
        const scoreStr = mole.getState('score').toString();

        for(let i=0; i<scoreStr.length; i++) {
            list.push(scoreStr.charAt(i));
        }

        return list;
    }

    return (
        <div className="modal-score-result">
            <h1>
                <span>S</span>
                <span>C</span>
                <span>O</span>
                <span>R</span>
                <span>E</span><br/>
                {scoreSplit().map((item, idx) => {
                    return <span key={item + '-' + idx}>{item}</span>
                })}
                <span>점</span>
            </h1>
        </div>
    )
}

export default ModalResult;