import React from 'react';

export default function VideoCard({
  video: {
    snippet: { title },
  },
}) {
  return <li>{<span>{title}</span>}</li>;
}
