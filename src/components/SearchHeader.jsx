import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaYoutube, FaGithub } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

export default function SearchHeader() {
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
    <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4 justify-between'>
      <Link to='/' className='flex items-center'>
        <FaYoutube className='text-4xl text-brand' title='logo' />
        <h1 className='font-bold ml-2 text-3xl'>YouTube</h1>
      </Link>
      <form onSubmit={handleSubmit} className='w-5/12 flex items-center'>
        <input //
          type='text'
          placeholder='Search...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full p-2 pl-5 outline-none bg-black text-gray-500 border border-zinc-900 rounded-s-full'
        />
        <button
          className='bg-zinc-600 hover:bg-zinc-500 px-5 py-3 border border-l-0 border-zinc-900 rounded-e-full'
          title='search'
        >
          <GoSearch />
        </button>
      </form>
      <div className='flex items-center'>
        <button
          onClick={() => window.open(process.env.REACT_APP_GITHUB_URL)}
          title='github'
          className='text-4xl rounded-full hover:bg-zinc-700'
        >
          <FaGithub />
        </button>
      </div>
    </header>
  );
}
