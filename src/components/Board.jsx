'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function Board({ posts }) {
    const durations = ['Day', 'Week', 'Month', 'Year', 'All-Time'];
    const sortOptions = ['Score', 'Time'];

    const [duration, setDuration] = useState('All-Time'); // Default filter
    const [sortOption, setSortOption] = useState('Score'); // Default sorting option
    // const [users, setUsers] = useState([]);
    // console.log('posts', posts);

    // Fetching dummy user data on mount
    // useEffect(() => {
    //     fetch('https://dummyjson.com/users?limit=15')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data && Array.isArray(data.users)) {
    //                 setUsers(data.users);
    //             } else {
    //                 console.error('Error: Invalid or missing user data');
    //             }
    //         })
    //         .catch((error) => console.error('Error fetching users:', error));
    // }, []);

    // Filtering and sorting logic using useMemo
    const filteredAndSortedUsers = useMemo(() => {
        // let filtered = [...posts];

        /* ------- posts -------
            0: 
                createdAt: "2024-10-21T18:45:13.453Z"
                creator: 
                    email: "goose@gmail.com"
                    image: "https://lh3.googleusercontent.com/a/ACg8ocJDFjRa4xD9JBaXdG4hhQHpVa8p0ZM9NeymFNPPkNi2ptFG5A=s96-c"
                    username: "seriu"
                    __v: 0
                    _id: "6711763f58d5d4995dc04963"
                    [[Prototype]]: Object
                time: 60
                title: "Time to Hunt."
                updatedAt: "2024-10-21T18:45:13.453Z"
                __v: 0
                _id: "6716a139cc51aea864e7db0c"
                [[Prototype]]: Object
            1: {_id: '6716a16ccc51aea864e7db12', creator: {…}, time: 120, title: 'Best of the Best.', createdAt: '2024-10-21T18:46:04.962Z', …}
            ------- -------
        */

        // Filter by duration
        const now = new Date();
        const filteredByDuration = posts.filter((post) => {
            const postDate = new Date(post.createdAt); // Mon Oct 21 2024 21:46:04 GMT+0300
            switch (duration) {
                case 'Day':
                    return now - postDate <= 24 * 60 * 60 * 1000;
                case 'Week':
                    return now - postDate <= 7 * 24 * 60 * 60 * 1000;
                case 'Month':
                    return now - postDate <= 30 * 24 * 60 * 60 * 1000;
                case 'Year':
                    return now - postDate <= 365 * 24 * 60 * 60 * 1000;
                default:
                    return true; // All-Time
            }
        });
        /* ------- filteredByDuration -------
        Same as posts, but filtered -> [{}, {}, ...]
            ------- -------
        */
        // Sum time for each user
        const summedDataPerUser = filteredByDuration.reduce((acc, post) => {
            const userId = post.creator._id;
            // Суммирование времени для каждого пользователя
            acc[userId] = {
                time: (acc[userId]?.time || 0) + post.time,
                score: (acc[userId]?.score || 0) + post.score,
            };
            return acc;
        }, {});
        // console.log('summedDataPerUser', summedDataPerUser);
        /* ------- summedTimePerUser -------
            {
                userId: {
                    score: 1
                    time: 200
                }
            },
            ------- -------
        */

        // Sort users based on selected sort option after summing time and score
        const sortedUsers = Object.keys(summedDataPerUser).sort((a, b) => {
            if (sortOption === 'Score') {
                return summedDataPerUser[b].score - summedDataPerUser[a].score;
            } else {
                return summedDataPerUser[b].time - summedDataPerUser[a].time;
            }
        });
        // summedTimePerUser[b] - summedTimePerUser[a]);
        // console.log('sortedUsers', sortedUsers);
        /* ------- sortedUsers -------
            [
                0: "[object Object]"
            ]
            ------- -------
        */

        const sortedUsersWithData = sortedUsers.map((userId) => {
            const userData = posts.find(post => post.creator._id === userId);

            if (!userData) {
                return null;
            }
  
            const user = {
                creator: userData.creator,
                time: summedDataPerUser[userId].time,
                score: summedDataPerUser[userId].score,
                username: userData.creator.username,
                image: userData.creator.image,
            };
            return user;
        }).filter(user => user !== null); // Filter to delete null values

        return sortedUsersWithData;
        
    }, [posts, duration, sortOption]);

    return (
        <section className="flex-center flex-col">
            <h1 className="head_text mb-12 blue_gradient">Leaderboard</h1>

            {/* Filter Buttons */}
            <div className="flex-center gap-4">
                {durations.map((d, index) => (
                    <button
                        key={index}
                        className={`text-xs border border-border-light p-2 rounded-full bg-transparent cursor-pointer transition-colors duration-300 hover:bg-border-dark hover:text-border-light sm:text-lg ${
                            duration === d ? 'bg-border-dark text-border-light' : ''
                        }`}
                        onClick={() => setDuration(d)}
                    >
                        {d}
                    </button>
                ))}
            </div>

            {/* Sorting Dropdown */}
            <div className="mt-4">
            <span className="text-border-light font-semibold">Sort by:</span>

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="p-2 border rounded bg-border-dark text-border-light cursor-pointer"
                >
                    {sortOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* User List */}
            <ul className="mt-4">
                {/* {console.log('sortedandfilterd', filteredAndSortedUsers)} */}
                {filteredAndSortedUsers.length > 0 ? (
                    filteredAndSortedUsers.map((user, index) => (
                        <li className="flex-between" key={index}>
                            <div className="flex-between">
                                <Image
                                    src={user.creator.image}
                                    alt="user_image"
                                    width={40}
                                    height={40}
                                />
                                <h3 className="p-2">
                                    {/* {user.firstName} {user.lastName} */}
                                    {user.creator.username}
                                </h3>
                            </div>
                            <div className="flex-between">
                                {/* {user.time} */}
                                <span className="p-2 w-16">{user.score}</span>
                                {/* {user.birthDate} */}
                                <span className="p-2 w-16">{user.time}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>There are no users...</p>
                )}
            </ul>
        </section>
    );
}