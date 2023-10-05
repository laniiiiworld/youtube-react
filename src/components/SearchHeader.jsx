import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { FaYoutube, FaGithub } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { useDarkMode } from '../context/DarkModeContext';

export default function SearchHeader() {
  const { darkMode, toggleDarkMode } = useDarkMode();
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
    <header className='w-full flex p-4 text-2xl border-b dark:border-zinc-600 mb-4 justify-between'>
      <Link to='/' className='flex items-center select-none'>
        <FaYoutube className='text-4xl text-brand' title='logo' />
        <h1 className='font-semibold ml-2 text-3xl tracking-tighter'>YouTube</h1>
      </Link>
      <form onSubmit={handleSubmit} className='w-5/12 flex items-center'>
        <input //
          type='text'
          placeholder='Search...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full p-2 pl-5 outline-none border-zinc-300 dark:bg-black dark:text-gray-500 border dark:border-zinc-900 rounded-s-full'
        />
        <button
          className='bg-zinc-100 hover:bg-zinc-200 border-zinc-300 dark:bg-zinc-600 hover:dark:bg-zinc-500 dark:border-zinc-900 px-5 py-3 border border-l-0 rounded-e-full'
          title='search'
        >
          <GoSearch />
        </button>
      </form>
      <div className='flex items-center gap-4'>
        <button
          onClick={() => toggleDarkMode()}
          title='dark/light mode'
          className={`text-2xl rounded-full p-1.5 ${
            darkMode ? '' : 'text-white bg-zinc-950 hover:bg-zinc-700'
          } dark:text-zinc-950 dark:bg-white dark:text-zinc-950 hover:dark:text-zinc-700`}
        >
          {darkMode ? <BsSunFill /> : <BsMoonFill />}
        </button>
        <button
          onClick={() => window.open(process.env.REACT_APP_GITHUB_URL)}
          title='github'
          className={`text-4xl rounded-full ${darkMode ? '' : 'hover:text-zinc-700'} hover:dark:bg-zinc-700`}
        >
          <FaGithub />
        </button>
      </div>
    </header>
  );
}
