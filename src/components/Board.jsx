'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=15')
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data.users)) {
                    setUsers(data.users);
                } else {
                    console.error('Error: Invalid or missing user data');
                }
            })
            .catch(error => console.error("Error fetching users:", error))
    }, []);

    const sortedUsers = users.sort((a, b) => b.weight - a.weight);

    return (
        <div className="mt-4">
             {sortedUsers.length > 0 ? (
                users.map((user, index) => {
                    return (
                        <div className="flex-between" key={index}>
                            <div className="flex-between">
                                <Image src={user.image} alt="user.username" width={40} height={40} />
                                <h3 className="p-2">
                                    {user.firstName} {user.lastName}
                                </h3>
                            </div>
                            <div className="flex-between">
                                <span className="p-2">{user.weight}</span>
                                <span className="p-2">{user.height}</span>
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default function Board() {
    const durations = ['Day', 'Week', 'Month', 'Year', 'All-Time'];

    const handleClick = (e) => {
        console.log(e.target);
    };

    return (
        <section className="flex-center flex-col">
            <h1 className="head_text mb-12 blue_gradient">Leaderboard</h1>

            <div className="flex-center gap-4">
                {durations.map((duration, index) => {
                    return (
                        <button 
                            key={index}
                            className="text-xs border border-border-light p-2 rounded-full bg-transparent cursor-pointer transition-colors duration-300 hover:bg-border-dark hover:text-border-light sm:text-lg"
                            onClick={handleClick}
                        >
                                {duration}
                        </button>
                    )
                })}
            </div>
            <UserList />
        </section>
    )
}