'use client';
import React from 'react';

const Alarm = React.forwardRef((_, ref) => {
    return (
        <audio ref={ref}>
            <source src="/alarm.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
});

Alarm.displayName = 'Alarm';
  
export default React.memo(Alarm);