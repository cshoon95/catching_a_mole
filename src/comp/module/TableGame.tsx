import { useSelector } from 'react-redux';
import { StoreStateType } from '../../type/Type';
import mole from "./../../core/Mole";

const TableGame = () => {
    const { screenData } = useSelector((state: StoreStateType) => {
        return { screenData: state.data.screenData }
    });

    // 두더지 id
    let i = -1;

    return (
        <table className="mole-list clearfix" >
            <tbody>
                {mole.utils.createArray(screenData.column).map((column: number, columnIdx: number) => {
                    return (
                        <tr key={columnIdx}>
                            {mole.utils.createArray(screenData.row).map((row: number, rowIdx: number) => {
                                i = i + 1;
                                return (
                                    <td className="mole" 
                                        key={columnIdx + '-' + rowIdx} 
                                    >
                                        <img alt="두더지 이미지" 
                                            id={i.toString()}
                                            src="images/mole.png"
                                            />
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableGame;