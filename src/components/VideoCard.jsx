import React from 'react';
import { formatAgo } from '../util/date';

export default function VideoCard({
  video: {
    snippet: { title, thumbnails, channelTitle, publishedAt },
  },
}) {
  return (
    <li className='cursor-pointer flex flex-col'>
      <img src={thumbnails.medium.url} alt={title} className='rounded-xl w-full' />
      <div>
        <p className='font-semibold my-2 line-clamp-2'>{title}</p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <span className='text-sm opacity-80'>{formatAgo(publishedAt)}</span>
      </div>
    </li>
  );
}
