import React, {CSSProperties} from 'react';
import {Color} from '../color';
import styles from './puzzle-cell.module.scss';

export type PuzzleCellProps = {
    color: Color;
    onClick?: () => void;
}

export const PuzzleCell = (props: PuzzleCellProps) => {

    const {
        color,
        onClick = () => {
        }
    } = props;

    const cssVariables = {
        '--puzzle-cell-color': color
    } as CSSProperties;

    return (
        <div className={styles.puzzleCell} style={cssVariables} onClick={onClick}/>
    );
};
