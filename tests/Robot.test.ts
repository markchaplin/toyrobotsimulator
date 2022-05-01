import {simulateRobot} from '../src/simulateRobot'

const logger = jest.fn()
const onPlace = jest.fn()

describe('Testing the simulateRobot function...', () => {
    beforeEach(() => {
        onPlace.mockReset()
        logger.mockReset()
    })
    it('Should handle the first provided example', async () => {
        const input = ['PLACE 0,0,NORTH','MOVE','REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(logger).toHaveBeenCalledTimes(1)
        expect(logger).toHaveBeenCalledWith(`0,1,NORTH`)
    })
    it('Should handle the second provided example', async () => {
        const input = ['PLACE 0,0,NORTH', 'LEFT', 'REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(logger).toHaveBeenCalledTimes(1)
        expect(logger).toHaveBeenCalledWith(`0,0,WEST`)
    })
    it('Should handle multiple PLACE commands', async () => {
        const input = ['PLACE 0,0,NORTH', 'PLACE 1,1,SOUTH', 'PLACE 4,2,EAST', 'REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(logger).toHaveBeenCalledTimes(1)
        expect(logger).toHaveBeenCalledWith(`4,2,EAST`)
    })
    it('Should prevent the robot from leaving the board', async () => {
        const input = ['PLACE 0,0,NORTH', 'PLACE 5,5,SOUTH', 'LEFT', 'MOVE', 'MOVE', 'REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(logger).toHaveBeenCalledTimes(1)
        expect(logger).toHaveBeenCalledWith(`0,0,WEST`)
    })
    it('Should ignore commands until the robot has been placed', async () => {
        const input = ['MOVE', 'REPORT', 'LEFT', 'RIGHT', 'PLACE 3,4,SOUTH', 'MOVE', 'REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(logger).toHaveBeenCalledTimes(1)
        expect(logger).toHaveBeenCalledWith(`3,3,SOUTH`)
    })
    it('Should handle multiple REPORT commands', async () => {
        const input = ['PLACE 3,4,SOUTH', 'MOVE', 'REPORT', 'RIGHT', 'MOVE', 'MOVE', 'REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(logger).toHaveBeenCalledTimes(2)
        expect(logger).toHaveBeenNthCalledWith(1, `3,3,SOUTH`)
        expect(logger).toHaveBeenNthCalledWith(2, `1,3,WEST`)
    })
    it('Should call the onPlace handler after each command', async () => {
        const input = ['MOVE',  'PLACE 3,4,SOUTH', 'MOVE', 'REPORT'].join('\n')
        await simulateRobot(input, onPlace, logger)
        expect(onPlace).toHaveBeenCalledTimes(4)
        expect(onPlace).toHaveBeenNthCalledWith(1, {command: 'MOVE', report: undefined})
        expect(onPlace).toHaveBeenNthCalledWith(2, {command: 'PLACE 3,4,SOUTH', report: {x: 3, y: 4, direction: 'SOUTH'}})
        expect(onPlace).toHaveBeenNthCalledWith(3, {command: 'MOVE', report: {x: 3, y: 3, direction: 'SOUTH'}})
        expect(onPlace).toHaveBeenNthCalledWith(4, {command: 'REPORT', report:  {x: 3, y: 3, direction: 'SOUTH'}})
    })
})