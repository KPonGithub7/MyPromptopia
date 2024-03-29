"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    useEffect(() => {
        try {
            const setUpProviders = async () => {
                const response = await getProviders();
                setProviders(response);
            };
            setUpProviders();
        } catch (error) {
            console.log(error.message);
        }
    }, []);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    return (
        <nav className="w-full flex-between mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* {alert(providers)} */}
            {/* Desktop navigation */}
            <div className="sm:flex hidden ">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>

                        <button
                            type="button"
                            className="outline_btn"
                            onClick={signOut}
                        >
                            Sign Out
                        </button>

                        <Link href="/profile">
                            <Image
                                src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="Profile Picture"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers)?.map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative z-30">
                {session?.user ? (
                    <div className="flex">
                        <Image
                            src={session?.user.image}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile Picture"
                            onClick={() => {
                                setToggleDropdown((prev) => !prev);
                            }}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                    }}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    className="w-full mt-5 black_btn"
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
                    <>
                        {providers &&
                            Object.values(providers)?.map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => {
                                        signIn(provider.id);
                                    }}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
