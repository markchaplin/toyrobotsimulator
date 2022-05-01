import { Coordinate, Direction, Report, TurnDirection } from "./types"


const TRANSFORM_MAP: Record<Direction, Coordinate> = {
    'NORTH': {x: 0, y: 1},
    'SOUTH': {x: 0, y: -1},
    'EAST': {x: 1, y: 0},
    'WEST': {x: -1, y: 0},
}

const DIRECTIONS: Direction[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'] 

export default class Robot {

    position?: Coordinate
    direction?: Direction
    
    constructor(private readonly gridSize: number) {    }

    private canPlace({x, y}: Coordinate): boolean {
        return x < this.gridSize && y < this.gridSize && x >= 0 && y >= 0
    }

    place(position: Coordinate, direction: Direction): Report | undefined {
        if (this.canPlace(position)) {
            this.position = position
            this.direction = direction
            return this.report()
        }
    }

    move (): Report | undefined {
        if (!this.position || !this.direction) {
            return;
        }

        const transform = TRANSFORM_MAP[this.direction]
        
        const newPosition = { x: this.position.x + transform.x, y: this.position.y + transform.y }
        if (this.canPlace(newPosition)) {
            this.position = newPosition
            return this.report()
        }         


    }

    turn(turnDirection: TurnDirection): Report | undefined {
        if (!this.direction) {
            return
        }
        const changeInIndex = turnDirection === 'LEFT' ? -1 : 1;
        const currentIndex = DIRECTIONS.indexOf(this.direction);
        const newIndex = (currentIndex + changeInIndex + DIRECTIONS.length) % DIRECTIONS.length
        this.direction = DIRECTIONS[newIndex]
        return this.report()
    }

    report(): Report | undefined {
        if (!this.direction || !this.position) {
            return
        }

        return {...this.position, direction: this.direction}
    }

}
