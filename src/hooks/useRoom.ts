import { useSelector } from 'react-redux';
export const useRoom = () => {
    const {place} = useSelector(state => state)

    return {place}
}