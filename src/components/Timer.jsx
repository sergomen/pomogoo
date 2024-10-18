import React from 'react';
import { FiBellOff } from 'react-icons/fi';

export default function Timer({ 
    stage, 
    switchStage, 
    getTickingTime, 
    seconds,
    ticking,
    // setTicking,
    startTimer,
    muteAlarm,
    isTimeUp,
    reset
}) {
    const options = ["Pomodoro", "Short Break", "Long Break"];

    return (
        <div className="flex flex-col justify-center items-center w-10/12 pt-5 mt-10 mx-auto text-white">
            <div className="flex items-center gap-5 text-center">
                {options.map((option, index) => {
                    return (
                        <h1
                            key={index}
                            className={`${
                                index === stage ? "bg-gray-500 bg-opacity-30" : ""
                            } p-1 cursor-pointer transition-all rounded`}
                            onClick={() => switchStage(index)}
                        >
                            {option}
                        </h1>
                    );
                })}
            </div>
            <div className="mt-10 mb-10">
                <h1 className="text-8xl font-bold select-none">
                    {getTickingTime()}:{seconds.toString().padStart(2, 0)}
                </h1>
            </div>
            <div className="flex gap-2 items-center">
                <button 
                    className="px-16 py-2 text-2xl rounded-md bg-white text-blue-500 uppercase font-bold"
                    onClick={startTimer}
                        // setTicking((ticking) => !ticking)}
                >
                    {ticking ? "Stop" : "Start"}
                </button>
                {isTimeUp && (
                    <FiBellOff
                        className="text-3xl text-white cursor-pointer"
                        onClick={muteAlarm}
                    />
                )}
            </div>
            {ticking && (
                <button 
                    className="uppercase text-white underline mt-5"
                    onClick={reset}
                >
                    Reset
                </button>
            )}
        </div>
    )
}
