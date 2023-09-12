import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';

export default function RelatedVideos({ keyword }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['related', keyword], () => youtube.relatedVideos(keyword), { staleTime: 1000 * 60 * 5 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Somthing is wrong!</p>;

  return (
    <>
      {videos && (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type='list' />
          ))}
        </ul>
      )}
    </>
  );
}
