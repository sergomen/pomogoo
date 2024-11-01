'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

export default function Navbar() {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    // useEffect(() => {
    //     const setUpProviders = async () => {
    //         const response = await getProviders();
    //         console.log('response', response);
    //         setProviders(response);
    //     }

    //     setUpProviders();
    // }, []);
    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3 px-2">
            <Link href="/" className="flex-center gap-2">
                <Image 
                    src="/assets/images/logo.svg"
                    alt="PomoGoo Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                />
                <p className="logo_text">PomoGoo</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                 {session?.user ? (
                    <div className="flex-center gap-3 md:gap-5">
                        <Link 
                            href="/add-time"
                            className="black_btn"
                        >
                            Add Time
                        </Link>
                        <Link 
                            href="/leaderboard"
                            className="black_btn"
                        >
                            Leaderboard
                        </Link>
                        <button 
                            type="button"
                            onClick={signOut}
                            className="outline-btn"
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <div className="flex-center gap-3 md:gap-5">
                        <Link 
                            href="/leaderboard"
                            className="black_btn"
                        >
                            Leaderboard
                        </Link>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex">
                {session?.user ? (
                    <div className="flex-between relative gap-3">
                        <Link 
                            href="/leaderboard"
                            className="black_btn"
                        >Leaderboard</Link>
                        <Image
                            src={session?.user.image}
                            alt="profile"
                            width={37}
                            height={37}
                            className="rounded-full"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Profile
                                </Link>
                                <Link 
                                    href="/add-time"
                                    className="w-full black_btn"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Add Time
                                </Link>
                                <button
                                    type="button"
                                    className="w-full mt-1 black_btn"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-center gap-1">
                        <Link 
                            href="/leaderboard"
                            className="black_btn"
                        >
                            Leaderboard
                        </Link>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>
        </nav>
    )
}