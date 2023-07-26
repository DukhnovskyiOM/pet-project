import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { actions } from '../redux/room/room.slice';
import { useAppDispatch } from './useAppSelection';

const rootActions = {
    ...actions,
}

export const useActions = () => {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        bindActionCreators(rootActions, dispatch)
    }, [dispatch])
}
