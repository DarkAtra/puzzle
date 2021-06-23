import {configureStore} from '@reduxjs/toolkit';
import {puzzleReducers, PuzzleState} from './puzzle-slice';

export const store = configureStore<PuzzleState>({
    reducer: puzzleReducers
});
