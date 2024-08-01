'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import axiosInstance from '@/libs/axiosConfig';
import { HomePageLoading, Loading } from '@/components';
import { BooksCardProp } from '@/components/AllBooksPage/BooksCard';
import "./style.css";
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import UserReview from './UserReview';
import { useRouter } from 'next/navigation';



/* eslint-disable @next/next/no-img-element */
const PageComponent = () => {
    const session = useSession();
    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [bookData, setBookData] = useState<BooksCardProp | null>(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [reviewArray, setReviewArray] = useState<Array<object>>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [userData, setUserData] = useState<string>("");
    const [reviewLoading, setReviewLoading] = useState<boolean>(false);
    const handleAddReview = async () => {
        if (session.status == 'unauthenticated') {
            router.push("/login");
        }
        if (userData) {
            const userId = session.data?.user?.id;
            const email = session.data?.user?.email;
            setReviewLoading(true);
            axiosInstance.post("/api/v1/review/addreview", { bookId: id, userId, comment: userData, email }).then((res) => {
                console.log(res.data);
                if (res.data.succes) {
                    console.log(res.data);
                    alert("Review Added Succesful");
                    setUserData("");
                    setPage(1);
                    getReveiw(true);
                }
            }).catch(console.error).finally
            {
                setReviewLoading(false);
            }
        }
    };
    const getReveiw = (reFetch: boolean) => {
        axiosInstance.post("/api/v1/review/getreview", { page, bookId: id })
            .then((res) => {
                if (res.data.succes) {
                    if (reFetch) {
                        setReviewArray([...res.data.payload.reviewsArray]);
                        return;
                    }

                    setHasMore(res.data.payload.hasMore);
                    setReviewArray((pre) => [...pre, ...res.data.payload.reviewsArray])
                }
            }).catch(console.error);
    }
    useEffect(() => {

        axiosInstance.get(`/api/v1/books/getBookById/${id}`)
            .then((res) => {
                if (res.data.succes) {
                    setBookData(res.data.payload);
                }
            }).catch(console.error)
            .finally
        {
            setLoading(false);
        }
    }, [id]);
    useEffect(() => {
        getReveiw(false);
    },[]);
    function handleClick() {
        if (hasMore)
            setPage((page) => page + 1);
    }
    if (loading) {
        return <HomePageLoading />
    }
    return (
        bookData &&
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className='grid px-5 md:py-20 md:px-40 gap-2 grid-cols-12  md:grid-cols-10  min-h-[500px]'>
                    <div className=" col-span-4 md:col-span-2  ">
                        <img className='md:h-72 md:w-48 h-60 w-32' src={bookData?.coverImageUrl || ""} alt='book image' />
                    </div>
                    <div className=" col-span-8 md:col-span-7 p-5 ">
                        <p className='font-bold text-nowrap text-sm md:text-5xl  italiana-regular'>{bookData.title}</p>
                        <p>By : <span className='text-gray-500 px-1 text-sm md:text-xl font-semibold'>{bookData.author} (author)</span></p>
                        <p className='my-2 text-sm md:text-xl tenor-sans-regular'>{bookData.description}</p>
                        <p>Publish Date :{'2feb'}</p>
                        <div className='flex  gap-2'>{bookData.genre?.map((item, idx) => {
                            return <p key={idx} className='bg-orange-600 h-5 md:h-10 flex items-center justify-center text-white p-0.5 md:p-1 text-sm'>{item}</p>
                        })}</div>
                    </div>
                    <div className="col-span-12 ">
                        <textarea onChange={(e) => setUserData(e.target.value)} value={userData} id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:placeholder-gray-400 " placeholder="Write your Review here..."></textarea>
                        <button className='md:h-10 h-7  px-1 py-2 text-[13px] md:text-sm  flex items-center gap-2 w-max md:px-10 md:py-2 my-2 rounded-xl bg-black text-white' onClick={handleAddReview}>
                            {reviewLoading && <Loader2 className='h-5 w-5 animate-spin' />}
                            Add Review</button>
                    </div>
                    <div className=' col-span-10'>
                        <h2 className='text-center my-2 text-xl font-bold '>Reviews </h2>
                        {reviewArray.length == 0 ? <p>No Review </p> : reviewArray.map((item, idx) => {
                            return <UserReview key={idx} comment={item.comment} email={item.email} createdAt={item.createdAt} />
                        })}
                    </div>
                    <div className='col-span-10'>
                        {hasMore && <button onClick={handleClick} className='bg-black p-1 px-10 rounded text-white'>More</button>}
                    </div>
                </div>


            </div>
        </Suspense>
    )
}



const SuspenseWrapper = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <PageComponent />
    </Suspense>
);

export default SuspenseWrapper;
