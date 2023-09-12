import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import ChannelInfo from '../ChannelInfo';

describe('ChannelInfo', () => {
  const fakeYoutube = {
    channelImageUrl: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageUrl.mockReset());

  it('renders correctly', async () => {
    fakeYoutube.channelImageUrl.mockImplementation(() => 'url');
    const { asFragment } = renderChannerInfo();

    await waitFor(() => screen.getByRole('img'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without URL', () => {
    fakeYoutube.channelImageUrl.mockImplementation(() => {
      throw new Error('error');
    });
    renderChannerInfo();

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders with URL', async () => {
    fakeYoutube.channelImageUrl.mockImplementation(() => 'url');
    renderChannerInfo();

    await waitFor(() => expect(screen.getByRole('img')).toBeInTheDocument());
  });

  function renderChannerInfo() {
    return render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<ChannelInfo id='id' name='channel' />} /> //
        ), //
        fakeYoutube
      ) //
    );
  }
});
