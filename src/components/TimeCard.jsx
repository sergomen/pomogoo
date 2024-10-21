'use client';

// import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function TimeCard({ post, handleEdit, handleDelete }) {
    const { data: session } = useSession();
    const pathName = usePathname();
    // const router = useRouter();

    return (
        <div className="time_card">
            <div className="flex-start gap-5">
                <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />

                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>
                    </div>
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.time}</p>
            <p className="my-4 font-satoshi text-sm text-gray-700">{post.title}</p>

            {session?.user.id === post.creator._id && pathName === '/profile' && (
                <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
                    <p
                        className="font-inter text-sm green_gradient cursor-pointer"
                        onClick={handleEdit}
                    >
                        Edit
                    </p>
                    <p
                        className="font-inter text-sm red_gradient cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </p>
                </div>
            )}
        </div>
    )
}
