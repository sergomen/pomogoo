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
        try {
            const response = await fetch('/api/time/new', {
                method: 'POST',
                body: JSON.stringify({
                    time: post.time,
                    userId: session?.user.id,
                    title: post.title
                })
            });
            
            if (response.ok) {
                router.push('/');
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