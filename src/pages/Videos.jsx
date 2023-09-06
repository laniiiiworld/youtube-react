import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const { keyword } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(['videos', keyword], () => youtube.search(keyword), { staleTime: 1000 * 60 * 1 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Somthing is wrong!</p>;

  return (
    <div>
      Videos {keyword ? `🔍 ${keyword}` : '🔥'}
      <ul>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </ul>
    </div>
  );
}
