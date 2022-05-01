export type Direction = 'NORTH' | 'SOUTH' | 'EAST' | 'WEST'
export type TurnDirection = 'LEFT' | 'RIGHT'

export type Coordinate = { x: number; y: number; }
export type Report = Coordinate & { direction: Direction }