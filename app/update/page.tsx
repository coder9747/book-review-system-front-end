'use client';
import { BooksCardProp } from '@/components/AllBooksPage/BooksCard';
import axiosInstance from '@/libs/axiosConfig';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { HomePageLoading, Loading } from '@/components';
import { AnimatePresence } from 'framer-motion';
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

/* eslint-disable @next/next/no-img-element */
const Page = () => {
  const session = useSession();
  const [userBooks, setUserBooks] = useState<Array<BooksCardProp> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (session.status == 'authenticated') {
      setLoading(true);
      const id = session?.data?.user?.id;
      axiosInstance.post("/api/v1/books/getuserbooks", { userId: id })
        .then((res) => {
          if (res.data.succes) {
            setUserBooks(res.data.payload);
          }
          setLoading(false);
        }).catch(console.error)

    }
  }, [session])
  if (loading) {
    return <HomePageLoading />
  };
  return (
    <div className='md:px-40 min-h-[500px] px-10 grid sm:grid-cols-2 md:grid-cols-3 '>
      {userBooks && userBooks.map((item, idx) => {
        return <Card key={idx} {...item} />
      })}
      {userBooks && userBooks.length == 0 && <p>No Books Found</p>}
    </div>
  )
}

export default Page

const Card = ({ author, description, coverImageUrl, _id }: { author: string, description: string, coverImageUrl: string, _id: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return <div className='border px-2 h-60 w-60 text-sm'>
    <img className='h-40 aspect-auto mx-auto ' src={coverImageUrl} alt="" />
    <p className='font-bold '>Author: {author.substr(0, 20)}...</p>
    <p>Description: {description}</p>
    <div className="buttons flex justify-start items-center   gap-2 my-2 ">
      <Link className='h-7 rounded w-max p-1  text-sm text-white bg-green-500' href={`/update/${_id}`}>Update</Link>
      <div onClick={() => setIsOpen(true)} className='h-7 rounded w-max p-1 text-sm text-white bg-red-500' >Delete</div>

    </div>
    <SpringModal id={_id} isOpen={isOpen} setIsOpen={setIsOpen} />
  </div>
}


const SpringModal = ({ isOpen, setIsOpen, id }: { isOpen: boolean, setIsOpen: Function, id: string }) => {
  const handleYes = () => {
    setIsOpen(false)
    axiosInstance.post(`/api/v1/books/delete/${id}`).then((res) => {
      if (res.data.succes) {
        window.location.reload();
      }
    }).catch(console.error)
      .finally
    {
      console.log("")
    }
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Do You Really Want To Delete
              </h3>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => handleYes()}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


