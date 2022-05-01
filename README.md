# Toy Robot Simulator

This project was created using `create-react-app`, and consists of a single web page showing a 5 x 5 grid, with a single textarea input. The user can input their commands and submit, and the robot's movements will be simulated on the grid.

## Available Commands

The follwing commands are available for the robot:
- PLACE X,Y,DIRECTION
- MOVE
- LEFT
- RIGHT
- REPORT

The `X` and `Y` parameters correspond to the x and y coordinates of the grid, with the bottom left corner being 0,0. The `DIRECTION` parameter can be one of the following 4 compass directions: `NORTH`, `SOUTH`, `EAST` and `WEST`.

The `REPORT` command will output the current postion and direction in the format `X,Y,DIRECTION`. 

All invalid commands will be ignored, including commands that would cause the robot to leave the board. The input field will validate the above commands.

## Running the simulator

This project uses node version `16.14` and makes use of `yarn` for package management and running scripts.

To start the simulator, run the following command from inside this directory:

```
yarn start
```

This will run the app on [http://localhost:3000](http://localhost:3000).

## Tests

There are some tests for the core `simulateRobot` function. These tests can be run by using the following command:

```
yarn test
```

## Further improvements

To take this project further, the following can be implemented going forward:

### Handle various grid sizes

The core `Robot` class was designed to handle any grid size, with the size of the grid being set during instantiation. However, the React app has been hardcoded to the 5 x 5 grid. This includes the styling, layout etc. 

It would be ideal to be able to set the grid size on the webpage while the app is running and have the board and `Robot` class use that value.

### Updated UI

The UI can be updated to match any style guide. The robot movements can also be animated instead of the current appearing / disappearing behaviour. 

Ideally the orientation of the robot should be shown via robot icon (ie front, back, left, right) as opposed to the current compass icon next to the board.
