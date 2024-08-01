import React, { useRef } from "react";
import Link from "next/link";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

export interface BooksCardProp {

    author?: string,
    coverImageUrl?: string,
    description?: string
    genre?: Array<string>
    publishedDate?: string,
    rating?: number
    reviews?: Array<any>
    title?: string,
    __v?: number,
    _id?: string,
    myRef?: any

}
/* eslint-disable @next/next/no-img-element */
const BooksCard = (props: BooksCardProp) => {
    const myRef = props.myRef || null;
    const id = props._id;
    return (
        <Link href={`/book?id=${id}`} ref={myRef} className="grid w-full place-content-center bg-gradient-to-br  text-slate-900" >
            <TiltCard  {...props} />
        </Link>
    );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ author, coverImageUrl, rating, title, description }: BooksCardProp) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: any) => {
        if (!ref.current) return [0, 0];
        //@ts-ignore
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }
            }
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br "
        >
            <div
                style={
                    {
                        transform: "translateZ(75px)",
                        transformStyle: "preserve-3d",
                    }
                }
                className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
            >
                <img className="h-[200px] object-contain  w-[150px]" src={coverImageUrl} alt="" />
                <p className="text-[17px] text-center font-bold mt-2">{title}</p>
                <p className="text-sm font-normal text-center my-1">Author: {author}</p>
                <p className="text-sm font-normal text-center my-1">Rating : {rating}</p>
              
                <p className="text-sm text-center px-2"> {description?.substring(0, 20)}...</p>
            </div>

        </motion.div>
    );
};

export default BooksCard;