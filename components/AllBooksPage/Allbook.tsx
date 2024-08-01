'use client';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import useScroll from './useScroll';
import BooksCard from './BooksCard';
import { Loader2 } from 'lucide-react';

const Allbook = () => {
    const [page, setPage] = useState<number>(1);
    const { loading, hasMore, data } = useScroll(page);
    const observer = useRef();
    const lastElement = useCallback((node: any) => {
        if (loading) return;
        //@ts-ignore
        if (observer.current) observer.current.disconnect();
        //@ts-ignore
        observer.current = new IntersectionObserver(ent => {
            if (ent[0].isIntersecting && hasMore) {
                setPage((pre) => pre + 1);
            }
        })
        //@ts-ignore
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);
    return (
        <Fragment>
            <p className='text-center my-2  font-medium text-3xl font-sans' id='books'>All Books </p>
            <div className=' px-10  grid  place-items-center gap-2  md:grid-cols-2 lg:grid-cols-3'>
                {data?.map((item, idx) => {
                    if (idx === data.length - 1) {
                        return <BooksCard key={idx} myRef={lastElement} {...item} />
                    }
                    return <BooksCard key={idx} {...item} />
                })}
            </div>
            {loading && <div ><Loader2 className='h-10 w-10 mx-auto my-2  animate-spin' /></div>}
        </Fragment>
    )
}

export default Allbook
