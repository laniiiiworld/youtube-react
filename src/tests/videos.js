export const fakeVideo = {
  id: 'video1',
  snippet: {
    publishedAt: new Date(),
    channelId: 'channel1',
    title: 'title',
    thumbnails: {
      medium: {
        url: 'http://image/',
        width: 320,
        height: 180,
      },
    },
    channelTitle: 'channel title',
  },
};

export const fakeVideos = [
  {
    id: 'video1',
    snippet: {
      publishedAt: new Date(),
      channelId: 'channel1',
      title: 'title 1',
      thumbnails: {
        medium: {
          url: 'http://image1/',
          width: 320,
          height: 180,
        },
      },
      channelTitle: 'channel title 1',
    },
  },
  {
    id: 'video2',
    snippet: {
      publishedAt: new Date(),
      channelId: 'channel2',
      title: 'title 2',
      thumbnails: {
        medium: {
          url: 'http://image2/',
          width: 320,
          height: 180,
        },
      },
      channelTitle: 'channel title 2',
    },
  },
];
