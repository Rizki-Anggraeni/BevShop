'use client';

import React from 'react';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={clsx('card p-6', onClick && 'cursor-pointer hover:shadow-xl', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
