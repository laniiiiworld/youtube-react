import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { GoSearch } from 'react-icons/go';
import SearchAreaBackground from './SearchAreaBackground';

export default function SearchArea({ isMobile, isShow, handleClose }) {
  const { keyword } = useParams();
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    navigate(`/videos/${text.trim()}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${isShow ? '' : 'hidden'} ${
          isMobile ? 'absolute w-full h-full z-10 top-0 left-0 px-3' : 'static w-5/12'
        } flex items-center`}
      >
        {isMobile && isShow && (
          <button type='button' className='pr-2' title='close' onClick={() => handleClose()}>
            <BiArrowBack />
          </button>
        )}
        <input //
          type='text'
          placeholder='Search...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full p-2 pl-5 outline-none border-zinc-300 dark:bg-black dark:text-gray-500 border dark:border-zinc-900 rounded-s-full'
        />
        <button
          type='submit'
          className='bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:bg-zinc-600 hover:dark:bg-zinc-500 dark:border-zinc-900 px-5 py-3 border border-l-0 rounded-e-full'
          title='search'
          data-testid='search'
        >
          <GoSearch />
        </button>
      </form>
      <SearchAreaBackground isMobile={isMobile} isShow={isShow} />
    </>
  );
}
