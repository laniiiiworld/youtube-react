import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from '../util/date';
import { unescapeSpecialCharacters } from '../util/string';

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, {
      state: { video },
    });
  };
  const isList = type === 'list';

  return (
    <li className={`cursor-pointer flex ${isList ? 'flex-row mb-2' : 'flex-col'}`} onClick={handleClick}>
      <img src={thumbnails.medium.url} alt={title} className={`rounded-xl ${isList ? 'w-5/12 mr-2' : 'w-full'}`} />
      <div className={`${isList ? 'w-7/12' : ''}`}>
        <p className='font-semibold my-2 line-clamp-2'>{unescapeSpecialCharacters(title)}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <span className='text-sm opacity-80'>{formatAgo(publishedAt)}</span>
      </div>
    </li>
  );
}
