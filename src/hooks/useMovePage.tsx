import { useNavigate, NavigateOptions } from 'react-router-dom'
import mole from "../core/Mole";

export const useMovePage = () => {
    const navigate = useNavigate()

    const setPage = (url: string, state?: NavigateOptions) => {
        mole.movePage(url);
        
        return navigate(url, { state })
    }

    return [setPage]
}

export default useMovePage