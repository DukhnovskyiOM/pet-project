import { useAppSelector } from './useAppSelection';
export const useRoom = () => {
    const {place} = useAppSelector(state => state)

    return {place}
}