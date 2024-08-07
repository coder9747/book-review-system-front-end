'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Index = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <div className='flex px-8 md:px-40 items-center justify-between  h-16 border-green-500'>
            <Link href={'/'} className='flex  h-full  items-center'>
                <Image alt='Brain Image Logo' height={40} width={40} src={'/logo.png'} />
                <p className='md:text-xl text-sm  font-bold font-sans tracking-tight'>Book <span className='bg-black p-1 rounded  text-white'>Hub</span></p>
            </Link>
            <div className='flex gap-2 md:gap-4'>
                {session.status == "authenticated" && <div className='min-h-7 md:px-10
                text-[12px] flex justify-center items-center  px-2   py-1 
                 bg-black text-white rounded md:py-2' onClick={() => signOut()}>SignOut</div>}
                {session.status == "unauthenticated" && <Link href={'/login'} className='min-h-7 md:px-10
                text-[12px] flex justify-center items-center  px-2   py-1 
                 bg-black text-white rounded md:py-2'>Register / Login</Link>}
                {session.status == "authenticated" && <div onClick={() => router.push('/update')} className='min-h-7 md:px-10
                text-[12px] flex justify-center items-center  px-2   py-1 
                 bg-black text-white rounded md:py-2'>My Books</div>}
            </div>

        </div>
    )
}

export default Index
