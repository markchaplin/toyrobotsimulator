import Icon from '@mdi/react';
import React from 'react'
import { Coordinate, Direction } from "../types";
import {mdiRobot} from '@mdi/js'
import { makeStyles } from '@material-ui/core';
import { Square } from './Square';

interface IBoardProps {
    position?: Coordinate;
    direction?: Direction
}

const useStyles = makeStyles({
    root: {
        width: '500px',
        height: '500px',
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
    }
})

function getCells(size: number): Coordinate[] {
    const cells: Coordinate[] = []
    for (let iy = 0; iy < size; iy ++) {
        for (let ix = 0; ix < size; ix++) {
            cells.push({x: ix, y: size - 1 - iy})
        }
    }

    return cells;
}

export const Board: React.FC<IBoardProps> = props => {

    const classes = useStyles()
    const squares = getCells(5)   

    return (
        <div className={classes.root}>
            {squares.map(s => {
                const showRobot = props.position && props.position.x === s.x && props.position.y === s.y 
                return (
                    <Square key={`${s.x}${s.y}`}>
                        {showRobot && (
                            <Icon path={mdiRobot}/>
                        )}
                    </Square>
                )
            })}
        </div>
    )
}

