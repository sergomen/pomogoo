'use client';

import { useState, useEffect, Suspence } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';

const UpdateTime = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const timeId = searchParams.get('id');
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        time: '',
        title: '',
    });

    useEffect(() => {
        const getTimeDetails = async () => {
            const response = await fetch(`/api/time/${timeId}`);
            const data = await response.json();

            setPost({
                time: data.time,
                title: data.title,
            });
        }

        if (timeId) getTimeDetails();
    }, [timeId]);

    const updateTime = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!timeId) return alert('Time ID not found');
         
        try {
            const response = await fetch(`/api/time/${timeId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    time: post.time,
                    title: post.title,
                })
            });
            
            if (response.ok) {
                router.push('/profile');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };

  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateTime}
    />
  );
};

export default function EditTime() {
    return <Suspence>
        <UpdateTime />
    </Suspence>
};