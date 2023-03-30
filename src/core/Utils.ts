
export default class Utils {
    /**
     * 일시 포맷팅
     * @param date 포맷팅할 Date
     * @returns yyyy/mm/dd-hh:mi:ss
     */
    sysdate(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = ('0' + (date.getMonth() + 1)).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);
        const hh = ('0' + date.getHours()).slice(-2); 
        const mi = ('0' + date.getMinutes()).slice(-2);
        const ss = ('0' + date.getSeconds()).slice(-2); 

        return yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mi + ':' + ss;
    }

    /**
     * 테이블 행 or 열 리스트로 생성
     * @param num 행 or 열의 값
     * @returns 개수에 따른 height값
     */
    createArray(num: number): number[] {
        return Array(num).fill(0).map((arr, i) => {
            return i
        })
    }

    /**
     * active 클래스 추가
     * @param el 추가할 El
     */
    addClassActive(el: Element | null) {
        el?.classList.add('active');
    }

    /**
     * active 클래스 제거
     * @param el 삭제할 El
     */
    removeClassActive(el: Element | null) {
        el?.classList.remove('active');
    }

    /**
     * 랜덤 값 가져오기
     * @param max 랜덤 값의 최대값 범위
     * @returns {string} 1~max 값 
     */
    randomNum(max: number) {
        return Math.floor((Math.random() * (max))).toString();
    }

    /**
     * 스코어 내림차순 및 개수 뽑아오기
     * @param arr 순위 리스트
     * @param num 뽑아올 개수
     */
    sortArray(arr: any, num: number) {
        return arr.slice(0, num).sort((a: {score: number, sysdate: string}, b: {score: number, sysdate: string}) => b.score - a.score);
    }
}