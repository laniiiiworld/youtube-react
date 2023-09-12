import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import { fakeVideos as videos } from '../../tests/videos';
import RelatedVideos from '../RelatedVideos';

describe('RelatedVideos', () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it('renders correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => videos);
    const { asFragment } = renderRelatedVideos();

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders related videos correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => videos);
    renderRelatedVideos();

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith('channelTitle');
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(videos.length));
  });

  it('renders loading', () => {
    fakeYoutube.relatedVideos.mockImplementation(() => videos);
    renderRelatedVideos();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error('error');
    });
    renderRelatedVideos();

    await waitFor(() => expect(screen.getByText('Somthing is wrong!')).toBeInTheDocument());
  });

  function renderRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<RelatedVideos keyword='channelTitle' />} /> //
        ), //
        fakeYoutube
      ) //
    );
  }
});
