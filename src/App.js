
/* This is a simple calculator app using react. 
  NB: This calculator does not handle negative values.

  Usage: input your expression and click on '=' button to get your answer.
        For percentage, input the number and click on the '%' button.
        This calculator will show 'Error' if the arithematic sequence is not 
        correct. 
        Any zero division will result to an Error.
*/


import * as React from 'react';
import './App.css';
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: '25%',
    margin: '0%',
    border: '1px solid black',
    background: 'rgba(0, 0, 0, 0.87)'
  },
  screen:{
    padding: theme.spacing(2),
    textAlign: 'left',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.6)',
  },
  paper:{

    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.6)',
  },
  paper1:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#fff',
    background: '#ff9800',
  },
  paper2:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
  }
}));


const App = () => {

  const [screenValue, setScreenValue] = React.useState('');

  const classes = useStyles();

  var newValue = '';

  const handleClick = (e) => {
    newValue += screenValue;
    setScreenValue(newValue + e.target.id);
  }

  //Convert to integer or floating number.
  const checkFloat = (a) =>{

    if(a.includes('.')){
      a = parseFloat(a); 
    }
     
    else{
      a = parseInt(a); 
    }
    return a;
  }

  //Compute the arithematics.
  const handleCalculations = () => {
    
    let a = '0'; // left value
    let b = '0'; // right value after the operand.
    var test = false; // to check when to move to right side.
    let operators = ['*', '+', '-', '/'];
    let operand; // to hold the arithematic operator.

    for (let i=0; i < screenValue.length; i++){
      
      if (!operators.includes(screenValue[i]) && test === false){
          if (i === 0){
              a = screenValue[i];
          }
          else{
                a += screenValue[i];    
              }  
          }
  
      else{
          test = true;
          if(operators.includes(screenValue[i]))
            operand = screenValue[i];

          if (!operators.includes(screenValue[i])){
              b += screenValue[i];
          }
      }
      
    }

  let answer;

  a = checkFloat(a);
  b = checkFloat(b);
   

  if(operand === '+'){
    
    answer = a + b;
    console.log(a ,'+', b, '=', answer);
  }
   
  else if(operand === '-'){
    answer = a - b;
  }
  else if(operand === '*'){
    answer = a * b;
  }
  else {
    //Handle division by zero
    if(b === 0)
      answer = 'INFINITY';
    else{
      answer = a / b;
      
    }
      
  }
 
  setScreenValue(answer);
  }

  const percentile = () =>{
    let number = screenValue;
   
    //Check for legal number.
    if(!isNaN(number)){
      number = checkFloat(number);
      number /= 100;
      
    }
    else
      number = 'Error';
    setScreenValue(number);
      
  }

  //Delete from the screen.
  const del = () =>{
    let content = screenValue;
    content = content.substring(0, content.length-1);
    setScreenValue(content);
  }
  
  const Row = () => 
  (
    <>
      <Grid item xs={3}>
          <Paper id={1} className={classes.paper} onClick={handleClick}>1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={2} className={classes.paper} onClick={handleClick}>2</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={3} className={classes.paper}  onClick={handleClick}>3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'/'} className={classes.paper1}  onClick={handleClick}>/</Paper>
        </Grid>
    </>
        
  );

  return (
    <div className="App">
      <Grid container spacing={2} className={classes.grid}>
        
        <Grid item xs={12}>
          <Paper className={classes.screen}>{screenValue}</Paper>
        </Grid>
        
        <Row />
        
        <Grid item xs={3}>
          <Paper id={4} className={classes.paper} onClick={handleClick}>4</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={5} className={classes.paper} onClick={handleClick}>5</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={6} className={classes.paper} onClick={handleClick}>6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'*'} className={classes.paper1} onClick={handleClick}>*</Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper id={7} className={classes.paper} onClick={handleClick}>7</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={8} className={classes.paper} onClick={handleClick}>8</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={9} className={classes.paper} onClick={handleClick}>9</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'-'} className={classes.paper1} onClick={handleClick}>-</Paper>
        </Grid>
        

        <Grid item xs={6}>
          <Paper id={0} className={classes.paper} onClick={handleClick}>0</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'.'} className={classes.paper} onClick={handleClick}>.</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'+'} className={classes.paper1} onClick={handleClick}>+</Paper>
        </Grid>
       
        <Grid item xs={6}>
          <Paper id={'del'} className={classes.paper2} onClick={del}>del</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'%'} className={classes.paper2} onClick={percentile}>%</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper id={'='} className={classes.paper1} onClick={handleCalculations}>=</Paper>
        </Grid>

      </Grid>
    </div>
    
  );
}

export default App;
