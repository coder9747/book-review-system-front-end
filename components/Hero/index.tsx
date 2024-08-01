'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FlipNumbers from 'react-flip-numbers';

const ShuffleHero = () => {
    return (
        <section className="w-full  px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:px-40 mx-auto">
            <div>
                <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
                    Read Everyday
                </span>
                <h3 className="text-4xl md:text-6xl font-semibold">
                    Dive into the World of
                </h3>
                <span className="flex justify-start">
                    <FlipNumbers height={55} width={42} numberClassName="text-4xl md:text-6xl font-semibold" color="black" background="white" delay={.2} duration={10} play perspective={800} numbers="55667  " />
                    <span className="text-4xl md:text-6xl font-semibold"> &nbsp; Books</span>

                </span>
                <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
                    Discover, Review, and Share Your Favorite Reads with a Community of Avid Readers
                </p>
                <div className="flex gap-2">
                    <Link href={'/addbook'} className="bg-black text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
                        Add Book
                    </Link>
                    <a onClick={()=>window.scrollBy({ top: 600, behavior: 'smooth' })} className="bg-black text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
                        See All Books
                    </a>
                </div>

            </div>
            <ShuffleGrid />
        </section>
    );
};

const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};

const squareData = [
    {
        id: 1,
        src: "https://storage.googleapis.com/lr-assets/main/covers/1709044808-619rxhfo0ul._sl1500_-131x200.jpg",
    },
    {
        id: 2,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/400/9781529433470.jpg",
    },
    {
        id: 3,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/400/9781446313176.jpg",
    },
    {
        id: 4,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781529424676.jpg",
    },
    {
        id: 5,
        src: "https://storage.googleapis.com/lr-assets/main/covers/1716477207-9781526617613-130x200.jpg",
    },
    {
        id: 6,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781035908639.jpg",
    },
    {
        id: 7,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781399604741.jpg",
    },
    {
        id: 8,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9780008625825.jpg",
    },
    {
        id: 9,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781446313176.jpg",
    },
    {
        id: 10,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781529038026.jpg",
    },
    {
        id: 11,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781399401586.jpg",
    },
    {
        id: 12,
        src: "https://storage.googleapis.com/lr-assets/main/covers/1718785473-9780349436470-131x200.jpg",
    },
    {
        id: 13,
        src: "https://storage.googleapis.com/lr-assets/main/covers/1718800545-61qfxkvv8rl._sl1500_-130x200.jpg",
    },
    {
        id: 14,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781837994014.jpg",
    },
    {
        id: 15,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781035900251.jpg",
    },
    {
        id: 16,
        src: "https://storage.googleapis.com/lr-assets/_nielsen/200/9781399725255.jpg",
    },
];

const GenerateSquares = () => {
    return shuffle(squareData).map((sq) => (
        <motion.div
            key={sq.id}
            layout
            transition={{ duration: 1.5, type: "spring" }}
            className="w-full h-full   "
            style={{
                backgroundImage: `url(${sq.src})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        ></motion.div>
    ));
};

const ShuffleGrid = () => {
    const timeoutRef = useRef(null);
    const [squares, setSquares] = useState(GenerateSquares());

    useEffect(() => {
        shuffleSquares();
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const shuffleSquares = () => {
        setSquares(GenerateSquares());

        timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    return (
        <div className="grid grid-cols-4 grid-rows-4 max-w-[600px] h-[500px] gap-1">
            {squares.map((sq: any) => sq)}
        </div>
    );
};

export default ShuffleHero;