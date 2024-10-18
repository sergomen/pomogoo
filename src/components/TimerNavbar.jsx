import React from 'react';
import { FiCommand, FiSettings } from 'react-icons/fi';

function TimerNavbar({ setOpenSettings }) {
  // console.log("Rebuilding");
  return (
    <nav className="flex justify-between mx-auto w-11/12 pt-5 text-white">
        <div className="flex items-center gap-1 cursor-pointer">
            <FiCommand className="text-sm" />
            <h1>PomoGoo</h1>
        </div>
        <FiSettings 
          className="text-2xl cursor-pointer" 
          onClick={() => setOpenSettings((value) => !value)}
        />
    </nav>
  )
}

export default React.memo(TimerNavbar);