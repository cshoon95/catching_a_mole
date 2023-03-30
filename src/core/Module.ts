import mole from "./Mole";

let score = 0;
let playId: any; 
let stopId: any;
export default class Module {
    /** 행x열의 값 */
    getRowXColumns = () => {
        const screenData = mole.getState('screenData');
        return screenData.row * screenData.column;
    }

    /** 두더지가 출현할 Elment Index */
    getRandomHoles = () => {
        const screenData = mole.getState('screenData');
        const result = []

        for (let i=0; i<screenData.count; i++) {
            result.push(mole.utils.randomNum(this.getRowXColumns()));
        }

        return result;
    }

    /** 출현한 두더지 Element List */ 
    getHolesEl = () => {
        const result = [];

        for (let i=0; i<this.getRandomHoles().length; i++) {
            result.push(document.getElementById(`${this.getRandomHoles()[i]}`));
        }

        return result;
    }

    /** 두더지 클릭 이벤트 */
    clickMoleEventHandler = (e: any, element: any) => {
        // hit 이미지로 수정
        e.target.src = '/images/mole_hit_hole.png';

        // 다시 이미지 복구
        setTimeout(() => {
            e.target.src = '/images/mole.png';
        }, 500)

        score = score + 1;

        this.catchMole(element)
    }

    /** 두더지 show */ 
    playingMole = () => {
        const elList = this.getHolesEl();

        // 두더지 등장
        const showMole = () => {
            elList.forEach(element => {
                // 애니메이션 추가
                mole.utils.addClassActive(element);

                // 클릭 이벤트 추가 ({ once : true } 이벤트 한 번 만 실행)
                element?.addEventListener('click', (e) => this.clickMoleEventHandler(e, element), { once : true });
            });

            stopId = setTimeout(this.hideMole, 3000);
        }

        showMole();
        playId = setTimeout(this.playingMole, 3000);
    }

     // 두더지 터치
    catchMole = (element: Element) => {
        mole.utils.removeClassActive(element);
    }

    /** 두더지 hide */ 
    hideMole = () => {
        for (let i = 0; i<this.getRowXColumns(); i++) {
            const element = document.getElementById(i.toString());
            mole.utils.removeClassActive(element);
        }
        clearTimeout(stopId);
    }

    /** 게임 정지 */
    stopMole = () => {
        clearTimeout(playId);
    }

    /** 스코어 가져오기 */
    getScore = () => {
        return score;
    }

    /** 스코어 초기화 */
    setScore = () => {
        mole.setState('score', 0);
        score = 0;
    }
}   
