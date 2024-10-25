'use client';

import { useState, useEffect } from 'react';
import TimeCard from '@/components/TimeCard';
import Board from '@/components/Board';

const TimeCardList = ({ data }) => {
    return (
        <div className="mt-16 time_layout">
            {data.map((post) => (
                <TimeCard
                    key={post._id}
                    post={post}
                />
            ))}
        </div>
    )
}

export default function Leaderboard() {
    const [posts, setPosts] = useState([]);
    const [duration, setDuration] = useState('All-Time'); // Default filter
    const [sortOption, setSortOption] = useState('Score'); // Default sort option

    // Fetching data on mount
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/time');
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <section>
            <Board 
                posts={posts} 
                duration={duration} 
                setDuration={setDuration} 
                sortOption={sortOption} 
                setSortOption={setSortOption} 
            />
        </section>
    )
}
