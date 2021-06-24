import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SliceCaseReducers} from '@reduxjs/toolkit/src/createSlice';
import {Color, nextColor, randomColor} from './color';

export type Board = {
    [key: number]: Color;
}

export type PuzzleState = {
    started: boolean;
    columns: number;
    rows: number;
    board: Board;
}

export type GenerateBoardAction = PayloadAction<{
    rows: number;
    columns: number;
}>

export type MakeMoveAction = PayloadAction<{
    row: number;
    column: number;
}>

export const puzzleSlice = createSlice<PuzzleState, SliceCaseReducers<PuzzleState>>({
    name: 'puzzle',
    initialState: {
        started: false,
        columns: 0,
        rows: 0,
        board: {}
    },
    reducers: {

        makeMove: (state: PuzzleState, action: MakeMoveAction) => {

            const {rows, columns, board} = state;
            const cells = rows * columns;

            const {row, column} = action.payload;
            const cellIndex = row * columns + column;

            const top = cellIndex - columns;
            const bottom = cellIndex + columns;
            const left = cellIndex - 1;
            const right = cellIndex + 1;

            let boardChanges = {} as Board;

            if (top > 0) {
                boardChanges[top] = nextColor(board[top]);
            }
            if (bottom < cells) {
                boardChanges[bottom] = nextColor(board[bottom]);
            }
            if (left >= 0 && left % columns !== columns - 1) {
                boardChanges[left] = nextColor(board[left]);
            }
            if (right < cells && right % columns !== 0) {
                boardChanges[right] = nextColor(board[right]);
            }

            return {
                ...state,
                board: {
                    ...board,
                    [cellIndex]: nextColor(board[cellIndex]),
                    ...boardChanges
                }
            };
        },

        generateBoard: (state: PuzzleState, action: GenerateBoardAction) => {

            const {rows, columns} = action.payload;
            const cells = rows * columns;

            const boardColor = randomColor();
            const centerColor = nextColor(boardColor);

            return {
                ...state,
                started: true,
                rows: rows,
                columns: columns,
                board: {
                    ...Array(rows * columns)
                        .fill(boardColor)
                        .reduce((board: Board, color: Color, index: number) => ({...board, [index]: color}), {}),
                    ...Array(cells).fill(0)
                        .map((_, index) => index)
                        .filter((index) => index > columns)
                        .filter((index) => index % columns !== 0)
                        .filter((index) => (index - columns + 1) % columns !== 0)
                        .filter((index) => (rows - 1) * columns > index)
                        .reduce((board: Board, index: number) => ({...board, [index]: centerColor}), {})
                }
            };
        }
    }
});

export const {makeMove, generateBoard} = puzzleSlice.actions;
export const puzzleReducers = puzzleSlice.reducer;
