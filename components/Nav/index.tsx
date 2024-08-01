'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

const Index = () => {
    const session = useSession();
    return (
        <div className='flex px-8 md:px-40 items-center justify-between  h-16 border-green-500'>
            <Link href={'/'} className='flex  h-full  items-center'>
                <Image alt='Brain Image Logo' height={40} width={40} src={'/logo.png'} />
                <p className='md:text-xl text-sm  font-bold font-sans tracking-tight'>Book <span className='bg-black p-1 rounded  text-white'>Hub</span></p>
            </Link>
            <div className='p-1 flex gap-3  text-sm text-black     rounded'>
                {session.status == 'unauthenticated' ? <Link className=' hover:rotate-1 bg-black h-7 flex items-center justify-center text-white px-10 w-full ' href={'/login'}>Register / Login</Link>
                    : <button onClick={() => signOut()} className='hover:rotate-1 bg-black h-7 flex items-center justify-center text-white px-10 w-full '>Sign Out</button>
                }
                {
                    session.status == 'authenticated'
                    &&
                    <Link href={'/update'} className=' bg-black border w-44 flex items-center justify-center text-white'>My Books</Link>
                }

            </div>

        </div>
    )
}

export default Index
