import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChannelInfo from '../components/ChannelInfo';
import Description from '../components/Description';
import RelatedVideos from '../components/RelatedVideos';
import { unescapeSpecialCharacters } from '../util/string';

export default function VideoDetail() {
  const h2Ref = useRef(null);
  const {
    state: {
      video: {
        id,
        snippet: { channelId, title, description, channelTitle },
      },
    },
  } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  return (
    <section className='flex flex-col lg:flex-row'>
      <article className='basis-4/6 px-4'>
        <iframe //
          id='player'
          type='text/html'
          title={unescapeSpecialCharacters(title)}
          width='100%'
          src={`https://www.youtube.com/embed/${id}`}
          frameBorder='0'
          allowFullScreen
          className='aspect-video'
        />
        <div>
          <h2 ref={h2Ref} className='text-2xl font-bold my-4'>
            {unescapeSpecialCharacters(title)}
          </h2>
          <ChannelInfo id={channelId} name={channelTitle} />
          <Description h2Ref={h2Ref} description={description} />
        </div>
      </article>
      <section className='basis-2/6 px-4 lg:pl-0'>
        <RelatedVideos keyword={channelTitle} />
      </section>
    </section>
  );
}
