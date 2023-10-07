import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { FaYoutube, FaGithub } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { useDarkMode } from '../context/DarkModeContext';
import SearchArea from './SearchArea';

export default function SearchHeader() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isShow, setIsShow] = useState(!isMobile);
  const showMobileSearchArea = () => setIsShow(true);
  const hideMobileSearchArea = () => setIsShow(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsShow(true);
        setIsMobile(false);
      } else {
        setIsMobile((prev) => {
          !prev && setIsShow(false);
          return true;
        });
      }
    };

    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <header className='relative w-full flex p-4 text-2xl border-b dark:border-zinc-600 mb-4 justify-between'>
      <Link to='/' className='flex items-center select-none'>
        <FaYoutube className='text-4xl text-brand' title='logo' />
        <h1 className='font-semibold ml-2 text-3xl tracking-tighter'>YouTube</h1>
      </Link>
      <SearchArea isMobile={isMobile} isShow={isShow} handleClose={hideMobileSearchArea} />
      <div className='flex items-center gap-4'>
        <button
          className='md:hidden' //
          title='search'
          data-testid='mobile search'
          onClick={showMobileSearchArea}
        >
          <GoSearch />
        </button>
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
