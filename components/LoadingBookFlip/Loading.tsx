'use client';
import React from 'react';
import { motion } from 'framer-motion';

const BookLoader = () => {
  const bookVariants = {
    initial: { rotateY: 0 },
    animate: { rotateY: 360 },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <motion.div
        variants={bookVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '100px',
          height: '100px',
          border: '10px solid #ccc',
          borderRadius: '10px',
          position: 'relative',
          backgroundColor: '#fff',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: '#f9f9f9',
          border: '5px solid #ccc',
          borderRadius: '10px',
          transform: 'rotateY(180deg)',
          transformOrigin: 'left',
          backfaceVisibility: 'hidden',
        }}>
          <div style={{ padding: '10px', textAlign: 'center', color: '#333' }}>Loading...</div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookLoader;
