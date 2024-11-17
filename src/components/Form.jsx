import Link from 'next/link';
import { useState } from 'react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    const [inputType, setInputType] = useState('minutes');

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log('value', value);
        setInputType(value);

    };

    const handleTimeChange = (e) => {
        const inputValue = e.target.value;

        if (inputValue.includes(':')) {
            const [hoursInput, minutesInput] = inputValue.split(':');
            if (/^\d{1,2}$/.test(hoursInput) && /^\d{2}$/.test(minutesInput)) {
                const hours = parseInt(hoursInput);
                const minutes = parseInt(minutesInput);
                const timeInMinutes = hours * 60 + minutes;

                setPost({ ...post, time: timeInMinutes });
            }
        }

        if (inputType === 'minutes') {
            const timeInMinutes = inputValue.replace(/[^0-9]/g, '');
            setPost({ ...post, time: timeInMinutes });
        }
    };

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    const time_format = (minutes) => {
        let hours = Math.floor(minutes/60)
        minutes = minutes % 60
        
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}` 
    }

    return (
        <section className="flex-start w-full max-w-full flex-col px-4 sm:px-16">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Time</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} Time and Participate in the competition with other people.
            </p>

            <form
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
                onSubmit={handleSubmit}
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Your Daily Time in </span>
                    <span>
                        <select onChange={handleInputChange}>
                            <option>
                                minutes
                            </option>
                            <option>
                                hh:mm
                            </option>
                        </select>
                    </span>
                    {inputType === 'minutes' ? (
                        <input
                            value={inputType === 'minutes' ? post.time : time_format(post.time)}
                            placeholder={inputType === 'minutes' ? "60" : "05:00"}
                            required
                            className="form_input"
                            onChange={handleTimeChange}
                        />
                    ) : (
                        <input
                            type="time"
                            value={time_format(post.time)}
                            placeholder="hh:mm"
                            required
                            className="form_input"
                            onChange={handleTimeChange}
                        />
                    )}
                </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Description
                    </span>

                    <textarea
                        value={post.title}
                        placeholder="Describe what did you do?"
                        required
                        className="form_textarea"
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
};

export default Form;