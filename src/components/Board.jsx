'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

export default function Board({ posts }) {
    const durations = ['Day', 'Week', 'Month', 'Year', 'All-Time'];
    const sortOptions = ['Score', 'Time'];

    const [duration, setDuration] = useState('All-Time'); // Default filter
    const [sortOption, setSortOption] = useState('Score'); // Default sorting option
    const [users, setUsers] = useState([]);

    // Fetching dummy user data on mount
    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=15')
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    console.error('Error: Invalid or missing user data');
                }
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Filtering and sorting logic using useMemo
    const filteredAndSortedUsers = useMemo(() => {
        let filtered = [...users];

        // Filter by duration (for now, using placeholders based on date logic)
        const now = new Date();
        filtered = filtered.filter((user) => {
            const postDate = new Date(user.birthDate); // Assuming birthDate as a sample date field
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

        // Sort users by Score (weight) or Time (birthDate)
        filtered.sort((a, b) => {
            if (sortOption === 'Score') {
                return b.weight - a.weight; // Assuming weight represents score
            } else if (sortOption === 'Time') {
                return new Date(b.birthDate) - new Date(a.birthDate); // Newest first
            }
        });

        return filtered;
    }, [users, duration, sortOption]);

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
                {filteredAndSortedUsers.length > 0 ? (
                    filteredAndSortedUsers.map((user, index) => (
                        <li className="flex-between" key={index}>
                            <div className="flex-between">
                                <Image
                                    src={user.image}
                                    alt="user_image"
                                    width={40}
                                    height={40}
                                />
                                <h3 className="p-2">
                                    {user.firstName} {user.lastName}
                                </h3>
                            </div>
                            <div className="flex-between">
                                <span className="p-2 w-16">{user.weight}</span>
                                <span className="p-2 w-16">{user.birthDate}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </ul>
        </section>
    );
}
