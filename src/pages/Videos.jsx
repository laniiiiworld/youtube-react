import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useInView } from 'react-intersection-observer';

export default function Videos() {
  const { keyword, videoId } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading, //
    error,
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['videos', keyword || videoId || ''],
    (params = null) => youtube.search(keyword, params?.pageParam),
    {
      staleTime: 1000 * 60 * 1,
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    }
  );
  const { ref: opserverRef, inView } = useInView({
    root: null, // viewport를 root로 사용
    rootMargin: '0px',
    threshold: 0.1, // 대상의 10% 이상이 보일 때 사용
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Somthing is wrong!</p>;
  if (!data?.pages) return <></>;
  const { pages } = data;

  return (
    <>
      <ul className='grid gap-2 gap-y-4 px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {pages.map(
          (page) =>
            page?.data &&
            page.data.map(
              (video) => <VideoCard key={video.id} video={video} type='grid' /> //
            )
        )}
      </ul>
      <div ref={opserverRef} className='m-20' data-testid='wrapper'></div>
      <div className='w-full h-20'></div>
    </>
  );
}
