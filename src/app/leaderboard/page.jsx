'use client';

import { useState, useEffect } from 'react';
import TimeCard from '@/components/TimeCard';

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

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/time');
            const data = await response.json();

            setPosts(data);
        }
        fetchPosts();
    }, []);

    return (
        <section>
            <TimeCardList
                data={posts}
            />
        </section>
    )
}
