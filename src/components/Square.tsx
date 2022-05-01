import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    root: {
        width: '60px',
        height: '60px',
        backgroundColor: '#E5E4E2',
        border: 'solid',
        borderWidth: '2px',
        borderColor: '#663300',
        padding: '18px',
        textAlign: 'center' 
    }
})

export const Square: React.FC<any> = props => {

    const classes = useStyles()
    return <div className={classes.root}>{props.children}</div>

}
