import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import ChannelInfo from '../../components/ChannelInfo';
import RelatedVideos from '../../components/RelatedVideos';
import { withRouter } from '../../tests/utils';
import { fakeVideo as video } from '../../tests/videos';
import VideoDetail from '../VideoDetail';

jest.mock('../../components/ChannelInfo');
jest.mock('../../components/RelatedVideos');

describe('VideoDetail', () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });

  it('renders video item details', () => {
    render(
      withRouter(<Route path='/' element={<VideoDetail />} />, {
        pathname: '/',
        state: { video },
        key: 'fake-key',
      })
    );
    const { title, channelId, channelTitle } = video.snippet;

    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({ keyword: channelTitle });
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });
  });
});
