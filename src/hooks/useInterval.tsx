import { useRef, useEffect } from 'react';

const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<any>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const time = () => { savedCallback.current(); }

        if (delay !== null) {
            const id = setInterval(time, delay);
            
            return () => clearInterval(id);
        }
    }, [delay]);
}

export default useInterval;