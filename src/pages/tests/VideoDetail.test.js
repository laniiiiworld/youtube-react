import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Route } from 'react-router-dom';
import ChannelInfo from '../../components/ChannelInfo';
import Description from '../../components/Description';
import RelatedVideos from '../../components/RelatedVideos';
import { withAllContexts, withRouter } from '../../tests/utils';
import { fakeVideo as video } from '../../tests/videos';
import VideoDetail from '../VideoDetail';

jest.mock('../../components/ChannelInfo');
jest.mock('../../components/Description');
jest.mock('../../components/RelatedVideos');

describe('VideoDetail', () => {
  const fakeYoutube = {
    video: jest.fn(),
  };

  beforeEach(() => {
    window.scrollTo = jest.fn();
    fakeYoutube.video.mockImplementation((videoId) => video);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders video item details', async () => {
    renderVideo();

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

    const { title, channelId, channelTitle, description } = video.snippet;
    expect(screen.getByTitle(title)).toBeInTheDocument();
    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({ keyword: channelTitle });
    expect(Description.mock.calls[0][0].h2Ref).toBeInstanceOf(Object);
    expect(Description.mock.calls[0][0].description).toBe(description);
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });
    expect(fakeYoutube.video).toHaveBeenCalledWith(video.id);
  });

  function renderVideo() {
    return render(
      withAllContexts(
        withRouter(<Route path='/' element={<VideoDetail />} />, {
          pathname: '/',
          state: { videoId: video.id },
        }),
        fakeYoutube
      )
    );
  }
});
