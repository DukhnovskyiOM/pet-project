import { useSelector } from 'react-redux';
export const useRoom = () => {
    const {desk} = useSelector(state => state)

    return {desk}
}