import Robot from "./Robot";
import { Direction, Report } from "./types";

export async function simulateRobot (rawInput: string, onPlace: (options: {command: string; report?: Report}) => Promise<void>, logger?: (log: string) => void) {
    const robot = new Robot(5)

    const commands = rawInput.split(/\r?\n/)
    for (const command of commands) {
        if (command.startsWith('PLACE')) {
            const [x,y,direction] = command.replace('PLACE ', '').split(',') as [string, string, Direction]
            const report = robot.place({ x: parseInt(x),y: parseInt(y) }, direction)
            await onPlace({command, report})
        } else if (command === 'MOVE') {
            const report = robot.move()
            await onPlace({command, report})
        } else if (command === 'LEFT' || command === 'RIGHT') {
            const report = robot.turn(command)
            await onPlace({command, report})
        } else if (command === 'REPORT') {
            const report = robot.report()
            await onPlace({command, report})
            if (report && logger) {
                logger(`${report.x},${report.y},${report.direction}`)
            }
        }
    }
}