import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ChannelInfo({ id, name }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: url,
  } = useQuery(['channel', id], () => youtube.channelImageUrl(id), { staleTime: 1000 * 60 * 5 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Somthing is wrong!</p>;

  return (
    <div className='flex items-center my-4 mb-6'>
      <img src={url} alt={name} className='rounded-full w-10 h-10' />
      <p className='ml-2 font-medium text-lg'>{name}</p>
    </div>
  );
}
