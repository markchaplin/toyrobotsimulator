import React, { useState } from 'react';
import {delay} from 'bluebird'
import Icon from '@mdi/react';

import {useForm, Controller} from 'react-hook-form'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextareaAutosize } from '@material-ui/core';
import { Board } from './components/Board';
import { Coordinate, Direction } from './types';
import { simulateRobot } from './simulateRobot';
import { mdiCompass } from '@mdi/js';
import useStyles from './styles'

interface IForm {
  commands: string;
}

const validationSchema = Yup.object().shape({
  commands: Yup.string().label('Commands').test('test-valid-commands', 'Invalid command format', function (value) {
    if (!value) {
      return true
    }
    const valid = value.split(/\r?\n/).every(command => {
      return [/^MOVE$/,/^LEFT$/,/^RIGHT$/,/^REPORT$/,/^PLACE \d,\d,(NORTH|SOUTH|EAST|WEST)$/].some(test => !!command.match(test))
    })

    return valid || this.createError({path: this.path})
  }).required('Enter your commands above')
})

function App() {
  
  const [position, setPositition] = useState<Coordinate>()
  const [direction, setDirection] = useState<Direction>()
  const [command, setCommand] = useState<string>()
  const [ignored, setIgnored] = useState<boolean>(false)
  const [reportDisplay, setReportDisplay] = useState<string>()

  const { handleSubmit,reset, control, formState: { isSubmitting, errors } } = useForm<IForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      commands: ''
    }
  })

  const classes = useStyles()

  const onSubmit = async (data: IForm) => {
    await simulateRobot(data.commands, (async ({command, report}) => {
      
      setCommand(command)

      if (report) {
        const {direction, ...coordinates} = report
        setDirection(direction)
        setPositition(coordinates)

        if (command === 'REPORT') {
          setReportDisplay(`Report: ${coordinates.x},${coordinates.y},${direction}`)
        }

      } else {
        setIgnored(true)
      }

      await delay(1000)
      setCommand('')
      setReportDisplay('')
      setIgnored(false)

    }))
  };

  const onReset = () => {
    setDirection(undefined)
    setPositition(undefined)
    reset()
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Toy Robot Simulator</div>
      <div className={classes.gameContainer}>
        <div className={classes.inputColumn}>
          <div className={classes.inputHeaderContainer}>
            Commands:
            {direction && (
              <div className={classes.directionContainer}>
                <Icon path={mdiCompass} size={1} />
                <div className={classes.direction}>
                  {direction.charAt(0)}
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.commandForm}>
            <Controller
              name="commands"
              control={control}
              render={({field}) => (
                <TextareaAutosize minRows={3} {...field} className={classes.commandInput}/>
                )}
            />
            <div className={classes.errorContainer}>
              {errors && errors.commands?.message}
            </div>
            <div className={classes.buttonContainer}>
              <Button disabled={isSubmitting} variant='contained' type="submit">Submit</Button>
              <Button disabled={isSubmitting} variant='contained' onClick={onReset}>Reset</Button>
            </div>
          </form>
          <div className={classes.outputContainer}>
            {command && (
              <div className={classes.commandText}>
                  Executing command:
                  <br /> 
                  {command}
              </div>
            )}
            {ignored && (
              <div className={classes.invalidText}>
                  INVALID
              </div>
            )}
            {reportDisplay && (
              <div className={classes.reportText}>
                  {reportDisplay}
              </div>
            )}
          </div>
        </div>
        <Board position={position}/>
      </div> 
    </div>
  );
}

export default App;
