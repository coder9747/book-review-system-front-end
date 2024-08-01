import React from 'react';
import datefns, { formatDistanceToNow } from "date-fns";

interface UserReveiwProps {
    email: string,
    createdAt: string,
    comment: string,
}/* eslint-disable @next/next/no-img-element */
const UserReview = ({ email, createdAt, comment }: UserReveiwProps) => {
    return (
        <div className='my-2'>
            <div className='flex gap-2 items-center '>
                <img className='h-7 w-7  ' src={'https://media.istockphoto.com/id/1130884625/vector/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-app-in-circle-design.jpg?s=612x612&w=0&k=20&c=1ky-gNHiS2iyLsUPQkxAtPBWH1BZt0PKBB1WBtxQJRE='} alt="" />
                <p className='font-bold text-[13px] md:text-sm '>{email}</p>
                <p className='text-slate-500  text-[12px] md:text-sm'>{getData(createdAt)}</p>
            </div>
            <div>
                <p className='font-normal  px-10 '>{comment}</p>

            </div>
        </div>
    )
}

export default UserReview


function getData(date: string) {
    return formatDistanceToNow(new Date(date), { addSuffix: true })
}