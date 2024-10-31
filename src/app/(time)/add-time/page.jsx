'use client';

import { useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@/components/Form';

export default function AddTime() {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        time: '',
        title: '',
    });

    const addTime = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Calculate score based on hours input
        const minutes = post.time;
        const hours = Math.floor(minutes / 60);
        const fractions = (minutes % 60) / 60;
        // const score = (hours + fractions).toFixed(2);
        const score = Math.round((hours + fractions) * 100) / 100;
        // const score = hours + fractions;
        // console.log(score);

        try {
            const response = await fetch('/api/time/new', {
                method: 'POST',
                body: JSON.stringify({
                    time: post.time,
                    userId: session?.user.id,
                    title: post.title,
                    score: score,
                })
            });
            
            if (response.ok) {
                router.push('/leaderboard');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <Form
        type="Add"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={addTime}
    />
  );
};