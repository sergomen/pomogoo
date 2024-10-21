'use client';

import { useState, useEffect, useRef } from 'react';
import TimerNavbar from '@/components/TimerNavbar';
import Timer from '@/components/Timer';
import Alarm from '@/components/Alarm';
import ModalSettings from '@/components/ModalSettings';

export default function Home() {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(1);
  const [longBreak, setLongBreak] = useState(15);

  const [stage, setStage] = useState(0);
  const [consumedSecond, setConsumedSecond] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [ticking, setTicking] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const alarmRef = useRef();
  const pomodoroRef = useRef();
  const shortBreakRef = useRef();
  const longBreakRef = useRef();

  const updateTimeDefaultValue = () => {
    setPomodoro(pomodoroRef.current.value);
    setShortBreak(shortBreakRef.current.value);
    setLongBreak(longBreakRef.current.value);
    setOpenSettings(false);
    setSeconds(0);
    setConsumedSecond(0);
  };

  const switchStage = (index) => {
    // console.log('consumedSecond', consumedSecond);
    const isYes = consumedSecond && stage !== index
      ? confirm("Are you sure you want to switch?")
      : false;
    if (isYes) {
      reset();
      setStage(index);
    } else if (!consumedSecond) {
      setStage(index);
    }
  };

  const getTickingTime = () => {
    const timeStage = {
      0: pomodoro,
      1: shortBreak,
      2: longBreak,
    };
    return timeStage[stage];
  };

  const updateMinute = () => {
    const updateStage = {
      0: setPomodoro,
      1: setShortBreak,
      2: setLongBreak,
    };
    return updateStage[stage];
  };

  const reset = () => {
    setConsumedSecond(0);
    setTicking(false);
    setSeconds(0);
    // setPomodoro(25);
    // setShortBreak(1);
    // setLongBreak(15);
    updateTimeDefaultValue();
  };

  const timeUp = () => {
    reset();
    setIsTimeUp(true);
    alarmRef.current.play();
  }

  const clockTicking = () => {
    const minutes = getTickingTime();
    const setMinutes = updateMinute();
    // console.log('setMinutes', setMinutes);

    if (minutes === 0 && seconds === 0) {
      timeUp();
    } else if (seconds === 0) {
      setMinutes((minute) => minute - 1);
      setSeconds(59);
    } else {
      setSeconds((second) => second - 1);
    }
  };

  const muteAlarm = () => {
    alarmRef.current.pause();
    alarmRef.current.currentTime = 0;
  };

  const startTimer = () => {
    setIsTimeUp(false);
    muteAlarm();
    setTicking((ticking) => !ticking);
  }; 

  useEffect(() => {
    window.onbeforeunload = () => {
      return consumedSecond ? "Show warning" : null;
    };

    const timer = setInterval(() => {
      if (ticking) {
        setConsumedSecond((value) => value + 1);
        clockTicking();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, pomodoro, shortBreak, longBreak, ticking]);

  return (
    <section className="bg-slate-950 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <TimerNavbar setOpenSettings={setOpenSettings} />
        <Timer 
            stage={stage} 
            switchStage={switchStage} 
            getTickingTime={getTickingTime} 
            seconds={seconds}
            ticking={ticking}
            // setTicking={setTicking}
            startTimer={startTimer}
            muteAlarm={muteAlarm}
            isTimeUp={isTimeUp}
            reset={reset}
        />
        <Alarm ref={alarmRef} />
        <ModalSettings 
          openSettings={openSettings} 
          setOpenSettings={setOpenSettings}
          pomodoroRef={pomodoroRef}
          shortBreakRef={shortBreakRef}
          longBreakRef={longBreakRef}
          updateTimeDefaultValue={updateTimeDefaultValue}
        />
      </div>
    </section>
  )
}
