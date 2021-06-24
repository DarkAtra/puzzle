import React, {CSSProperties} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PuzzleCell} from './puzzle-cell/puzzle-cell';
import {generateBoard, makeMove, PuzzleState, shuffleBoard} from './puzzle-slice';
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
        <>
            <div className={styles.menu}>
                <button className={styles.button} onClick={() => dispatch(shuffleBoard({times: 10, duration: 500}))}>Shuffle 10</button>
                <button className={styles.button} onClick={() => dispatch(shuffleBoard({times: 50, duration: 1000}))}>Shuffle 50</button>
            </div>

            <div className={styles.puzzle} style={cssVariables}>

                {Array(rows).fill(0).map((_, row) =>
                    Array(columns).fill(0).map((_, column) => {
                        const cellIndex = row * columns + column;
                        return <PuzzleCell key={`${row}-${column}`} color={board[cellIndex]} onClick={() => dispatch(makeMove({row, column}))}/>;
                    })
                )}

            </div>
        </>
    ) : (
        <div>
            <button className={styles.button} onClick={() => dispatch(generateBoard({
                columns: 4,
                rows: 4
            }))}>
                Start Game
            </button>
        </div>
    );
};
