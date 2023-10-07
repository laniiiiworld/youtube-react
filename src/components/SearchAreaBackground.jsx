import React from 'react';

export default function SearchAreaBackground({ isMobile, isShow }) {
  return (
    <div
      className={`${isMobile && isShow ? 'absolute w-full h-full bg-white dark:bg-zinc-900 top-0 left-0' : 'hidden'}`}
    ></div>
  );
}
