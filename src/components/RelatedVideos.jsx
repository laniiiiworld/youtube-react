import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';
import Skeleton from './loading/Skeleton';

export default function RelatedVideos({ keyword }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['related', keyword], () => youtube.relatedVideos(keyword), { staleTime: 1000 * 60 * 5 });

  if (error) return <p>Somthing is wrong!</p>;

  return (
    <>
      <ul>
        {!isLoading && videos.map((video) => <VideoCard key={video.id} video={video} type='list' />)}
        {isLoading && Array.from({ length: 10 }, (_, i) => <Skeleton key={i} type='list' />)}
      </ul>
    </>
  );
}
