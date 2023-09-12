import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(['channel', id], () => youtube.channelImageUrl(id), { staleTime: 1000 * 60 * 5 });

  return (
    <div className='flex items-center my-4 mb-6'>
      {url && <img src={url} alt={name} className='rounded-full w-10 h-10' />}
      <p className='ml-2 font-medium text-lg'>{name}</p>
    </div>
  );
}
