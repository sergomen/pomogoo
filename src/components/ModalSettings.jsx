import React from 'react';
import { FiX } from 'react-icons/fi';

function ModalSettings({
    openSettings,
    setOpenSettings,
    pomodoroRef,
    shortBreakRef,
    longBreakRef,
    updateTimeDefaultValue,
}) {
    const inputs = [
        {
            value: "Pomodoro",
            ref: pomodoroRef,
            defaultValue: 25,
        },
        {
            value: "Short Break",
            ref: shortBreakRef,
            defaultValue: 5,
        },
        {
            value: "Long Break",
            ref: longBreakRef,
            defaultValue: 15,
        }
    ];

  return (
    <>
        <div 
            className={`absolute h-full w-full left-0 top-0 bg-black bg-opacity-30 ${
                openSettings ? '' : 'hidden'
            }`}
            onClick={() => setOpenSettings(false)}
        ></div>
        <div
            className={`max-w-xl bg-background absolute sm:w-96 w-11/12 left-1/2 top-1/2 p-5 rounded-md border border-gray-200 dark:border-gray-800 shadow-2xl ${
                openSettings ? '' : 'hidden'
            }`}
            style={{
                transform: "translate(-50%, -50%)",
            }}
        >
            <div className="flex justify-between items-center text-foreground opacity-60">
                <h1 className="uppercase font-bold tracking-wider">Time settings</h1>
                <FiX 
                    className="text-2xl cursor-pointer"
                    onClick={() => setOpenSettings(false)}
                />
            </div>
            <div className="h1 w-full bg-gray-400 mt-5 mb-5"></div>
            <div className="flex gap-5">
                {inputs.map((input, index) => {
                    return (
                        <div key={index}>
                            <h1 className="text-gray-400 text-sm">{input.value}</h1>
                            <input
                                defaultValue={input.defaultValue}
                                type="number"
                                className="w-full bg-gray-200 dark:bg-gray-800 py-2 rounded outline-none text-center text-foreground focus:ring-2 focus:ring-primary-orange transition-all"
                                ref={input.ref}
                            />
                        </div>  
                    );
                })}
            </div>
            <button 
                className="bg-green-500 uppercase w-full mt-5 text-white rounded py-2"
                onClick={updateTimeDefaultValue}
            >
                Save
            </button>
        </div>
    </>
  );
}

export default React.memo(ModalSettings);