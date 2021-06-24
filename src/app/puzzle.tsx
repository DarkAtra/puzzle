import React, {CSSProperties} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PuzzleCell} from './puzzle-cell/puzzle-cell';
import {generateBoard, makeMove, PuzzleState} from './puzzle-slice';
import styles from './puzzle.module.scss';

export type PuzzleProps = {
    maxWidth: string;
    maxHeight: string;
}

export const Puzzle = (props: PuzzleProps) => {

    const started = useSelector((state: PuzzleState) => state.started);
    const columns = useSelector((state: PuzzleState) => state.columns);
    const rows = useSelector((state: PuzzleState) => state.rows);
    const board = useSelector((state: PuzzleState) => state.board);

    const dispatch = useDispatch();

    if (!started) {
        dispatch(generateBoard({
            columns: 4,
            rows: 4
        }));
    }

    const {
        maxWidth,
        maxHeight
    } = props;

    const cssVariables = {
        '--puzzle-columns': columns,
        '--puzzle-rows': rows,
        '--puzzle-max-width': maxWidth,
        '--puzzle-max-height': maxHeight
    } as CSSProperties;

    return started ? (
        <div className={styles.puzzle} style={cssVariables}>

            {Array(rows).fill(0).map((_, row) =>
                Array(columns).fill(0).map((_, column) => {
                    const cellIndex = row * columns + column;
                    return <PuzzleCell key={`${row}-${column}`} color={board[cellIndex]} onClick={() => dispatch(makeMove({row, column}))}/>;
                })
            )}

        </div>
    ) : (
        <div>Preparing Game...</div>
    );
};
