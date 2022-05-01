import { makeStyles } from "@material-ui/core";


export default makeStyles({
    container: {
        textAlign: 'center'
    },
    header: {
        fontSize: 30
    },
    gameContainer: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      },
    inputColumn: {
        display: 'flex',
        height: '500px',
        width: '500px',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center'
      },
      inputHeaderContainer: {
          fontSize: 20, 
          display: 'flex', 
          flexDirection: 'row', 
          width: '90%', 
          height: '40px', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        },
      directionContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        height: '100%',  
        justifyContent: 'space-between', 
        alignItems: 'center'
      },
      direction: {
          width: '20px'
      },
      commandForm: {
        display: 'flex',
        height: '300px',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      commandInput: {
          width: '90%', 
          maxWidth: '90%', 
          minWidth: '90%',
          height: '70%', 
          minHeight: '70%', 
          maxHeight: '70%', 
          padding: '6px', 
          fontSize: '18px'
        },
        errorContainer: {
            height: '20px',
            minHeight: '20px',
            width: '100%',
            color: 'red'
        },
        buttonContainer: {
            width: '100%', 
            padding: '5px', 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-evenly', 
            alignItems: 'center'
        },
        outputContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        commandText: {
            fontSize: 18, 
            height: '60px'
        },
        invalidText: {
            fontSize: 18, 
            height: '30px', 
            color: 'red'
        },
        reportText: {
            fontSize: 18, 
            height: '30px'
        }
})