'use client';
import React from 'react';
import { motion } from 'framer-motion';

const pageFlipVariants = {
    initial: { rotateY: 0 },
    animate: { rotateY: -180 },
};

const BookFlip = () => {
    const pages = [{ id: 1, text: "Please Wait" }, { id: 2, text: "Page " }, { id: 3, text: "loading" }];
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ position: 'relative', width: '200px', height: '300px', perspective: '1000px' }}>
                {pages.map((page, index) => (
                    <motion.div
                        key={index}
                        variants={pageFlipVariants}
                        initial="initial"
                        animate="animate"
                        transition={{ duration: 1, delay: index * 0.5, repeat: Infinity, repeatDelay: pages.length * 0.5 }}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            background: index % 2 === 0 ? '#fff' : '#f0f0f0',
                            border: '1px solid #ccc',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backfaceVisibility: 'hidden',
                            transformOrigin: 'left',
                            zIndex: pages.length - index,
                        }}
                    >
                        {page.text}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BookFlip;
