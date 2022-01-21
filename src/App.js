import { useEffect, useReducer, useRef } from 'react';

import styles from './App.module.css';

import Timer from './content/Timer/Timer';
import ButtonWrapper from './content/ButtonWrapper/ButtonWrapper';
import Interval from './content/Interval/Interval';

function genID() {
  const timeStamp = Date.now();
  let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let Id = '';
  for (let i = 0; i < 7; i++) {
    let rom = Math.floor(1 + (str.length - 1) * Math.random());
    Id += str.charAt(rom);
  }
  Id += timeStamp.toString();
  return Id;
}

const timerReducer = (state, action) => {
  if (action.type === 'USER_TOGGLE') {
    return { ...state, timerIsToggled: !state.timerIsToggled }
  }
  if (action.type === 'USER_UNTOGGLE') {
    return { ...state, timerIsToggled: false }
  }
  if(action.type === 'USER_PRESS_START') {
    return {...state,  startPressed: 'Start'}
  }
  if(action.type === 'USER_PRESS_PAUSE') {
    return {...state,  startPressed: 'Pause'}
  }
  if(action.type === 'USER_CLEAR_INTERVAL') {
    return {...state,  intervalArr: []}
  }
  if(action.type === 'USER_ADD_INTERVAL') {
    return {...state,  intervalArr: [
      ...state.intervalArr, state.timerValue
    ]}
  }
  if (action.type === 'CURRENT_TIME_CHANGE') {
    return {...state, timerValue:
      {
        mlseconds: state.timerValue.mlseconds === 99 ? 0 : state.timerValue.mlseconds + 1,
        seconds: state.timerValue.seconds === 59 ? 0 : (state.timerValue.mlseconds === 99 ? state.timerValue.seconds + 1 : state.timerValue.seconds),
        minutes: state.timerValue.minutes === 59 ? 0 : (state.timerValue.seconds === 59 ? state.timerValue.minutes + 1 : state.timerValue.minutes),
        hours: state.timerValue.minutes === 59 ? state.timerValue.hours + 1 : state.timerValue.hours,
        id: genID(),  
      }
    };
  }
  if (action.type === 'CURRENT_TIME_JOINT') {
    return {...state,timerValue:
      {
        ...state.timerValue, id: genID()
      }
    }
  }
  if (action.type === 'CURRENT_TIME_ZERO') {
    return {...state, timerValue: { hours: 0, minutes: 0, seconds: 0, mlseconds: 0 } }
  } 
  if(action.type === 'USER_ADD_CIRCLE') {
    return {...state, circleStarted: true}
  }
  if(action.type === 'USER_DELETE_CIRCLE') {
    return {...state, circleStarted: false}
  }
  if(action.type === 'USER_HAVE_CIRCLE') {
    return {...state, circleEmpty: false}
  }
  if(action.type === 'USER_HAVENO_CIRCLE') {
    return {...state, circleEmpty: true}
  } else {return}
};

function App() {
  const [timerState, dispatchTimer] = useReducer(timerReducer, { timerValue: { hours: 0, minutes: 0, seconds: 0, mlseconds: 0 }, timerIsToggled: false, startPressed: 'Start', intervalArr: [], circleStarted: false, circleEmpty: false });

  const myRef = useRef(0);

  const timeCondition = (timerState.timerValue.mlseconds > 0 || timerState.timerValue.seconds > 0 || timerState.timerValue.minutes > 0 || timerState.timerValue.hours > 0);

  useEffect(() => {
    if (timerState.timerIsToggled) {
      myRef.current = setInterval(()=>dispatchTimer({ type: 'CURRENT_TIME_CHANGE' }), 10);
      dispatchTimer({type: 'USER_PRESS_PAUSE'});
    } else {
      clearInterval(myRef.current);
    }
    return () => {
      clearInterval(myRef.current);
      dispatchTimer({type: 'USER_PRESS_START'});
    }
  }, [timerState.timerIsToggled]);

  useEffect(() => {
    if (!timerState.circleStarted && timerState.circleEmpty) {
      dispatchTimer({type: 'USER_CLEAR_INTERVAL'});
      dispatchTimer({type: 'USER_DELETE_CIRCLE'});
      dispatchTimer({type: 'USER_HAVENO_CIRCLE'});
    } else if (timerState.circleStarted && !timerState.circleEmpty && timerState.intervalArr.length <= 6) {
      dispatchTimer({ type: 'CURRENT_TIME_JOINT'});
      dispatchTimer({type: 'USER_ADD_INTERVAL'});
      dispatchTimer({type: 'USER_HAVENO_CIRCLE'});
    }
  }, [timerState.circleStarted, timerState.circleEmpty, timerState.intervalArr.length]);

  const timerStartHandler = () => {
    dispatchTimer({type: 'USER_TOGGLE' });
  };

  const timerStopHandler = () => {
    dispatchTimer({type: 'USER_DELETE_CIRCLE'});
    dispatchTimer({type: 'USER_HAVENO_CIRCLE'});
    dispatchTimer({ type: 'USER_UNTOGGLE' });
    dispatchTimer({type: 'CURRENT_TIME_ZERO' });
    dispatchTimer({type: 'USER_PRESS_START' });

  };

  const startIntervalHandler = () => {
    if(timeCondition) {
      dispatchTimer({type: 'USER_ADD_CIRCLE'});
      dispatchTimer({type: 'USER_HAVE_CIRCLE'});
    } else {return}
  };

  return (
    <main className={styles.wrapper}>
      <Timer currentTime={timerState.timerValue} isToggled={timerState.timerIsToggled} />
      <ButtonWrapper
        currentTime={timerState.timerValue}
        isnotToggled={timerState.timerIsToggledisToggled}
        className={styles.btns}
        timerStopHandler={timerStopHandler}
        timerStartHandler={timerStartHandler}
        timerNotStarted={timerState.startPressed}
        intervalStarted={startIntervalHandler}
      />
      {timerState.circleStarted && timeCondition > 0 && timerState.intervalArr.length > 0 && <Interval intervalArr={timerState.intervalArr} />}
    </main>
  );
}

export default App;


//OLD VERSION VIA USESTATE
// import { useState, useEffect} from 'react';
// import styles from './App.module.css';

// import Timer from './content/Timer/Timer';
// import ButtonWrapper from './content/ButtonWrapper/ButtonWrapper';
// import Interval from './content/Interval/Interval';

// function App() {

// const [currentTime, setCurrentTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

//   const [isToggled, setIsToggled] = useState(false);

//   const [notStarted, setNotStarted] = useState("Start");

//   const [intervalStarted, setIntervalStarted] = useState({ forIntervalDispl: false, forIntervalClearance: false });

//   const [intervalArr, setIntervalArr] = useState([]);

//   function genID() {
//     const timeStamp = Date.now();
//     let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
//     let Id = '';
//     for (let i = 0; i < 7; i++) {
//       let rom = Math.floor(1 + (str.length - 1) * Math.random());
//       Id += str.charAt(rom);
//     }
//     Id += timeStamp.toString();
//     return Id;
//   }

//   useEffect(() => {
//     if (isToggled) {
//       settedInterval = setInterval(timerUpdateHandler, 1000);
//       setNotStarted('Pause');
//     } else {
//       clearInterval(settedInterval);
//     }
//     return () => {
//       clearInterval(settedInterval);
//       setNotStarted('Start');
//     }
//   }, [isToggled]);

//   useEffect(() => {
//     if (!intervalStarted.forIntervalDispl && intervalStarted.forIntervalClearance) {
//       setIntervalArr([]);
//       setIntervalStarted({ forIntervalDispl: false, forIntervalClearance: false });

//     } else if (intervalStarted.forIntervalDispl && !intervalStarted.forIntervalClearance && intervalArr.length <= 6 && (currentTime.seconds > 0  || currentTime.minutes> 0 || currentTime.hours > 0)) {

//       setCurrentTime((prevState) => {
//         return ({...prevState, id: genID()
//         }
//         );
//       });

//       setIntervalArr((oldArr) => {
//         return [...oldArr, currentTime]
//       });
//     }
//   }, [intervalStarted]);

//   let settedInterval;
//   const timerUpdateHandler = () => {
//     setCurrentTime((prevState) => {
//       return (
//         {
//           seconds: prevState.seconds === 59 ? 0 : prevState.seconds + 1,
//           minutes: prevState.seconds === 59 ? prevState.minutes + 1 : prevState.minutes,
//           hours: prevState.minutes === 59 ? prevState.hours + 1 : prevState.hours,
//           id: genID()
//         }
//       );
//     });
//   };

//   const timerStartHandler = () => {
//     setIsToggled(!isToggled);
//   };

//   const timerStopHandler = () => {
//     setIsToggled(false);
//     setIntervalStarted({ forIntervalDispl: false, forIntervalClearance: true });
//     setCurrentTime({ hours: 0, minutes: 0, seconds: 0 });

//   };

//   const startIntervalHandler = () => {
//     setIntervalStarted({ forIntervalDispl: true, forIntervalClearance: false });
//   };

//   return (
//     <main className={styles.wrapper}>
//       <Timer currentTime={currentTime} isToggled={isToggled}/>
//       <ButtonWrapper
//         currentTime={currentTime}
//         isnotToggled={isToggled}
//         className={styles.btns}
//         timerStopHandler={timerStopHandler}
//         timerStartHandler={timerStartHandler}
//         timerNotStarted={notStarted}
//         intervalStarted={startIntervalHandler}
//       />
//       {intervalStarted.forIntervalDispl && (currentTime.seconds > 0  || currentTime.minutes> 0 || currentTime.hours > 0) > 0 && intervalArr.length > 0 && <Interval intervalArr={intervalArr} />}
//     </main>
//   );
// }

// export default App;

