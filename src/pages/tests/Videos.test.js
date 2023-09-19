import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { withRouter, withAllContexts } from '../../tests/utils';
import Videos from '../Videos';
import { fakeVideo, fakeVideos } from '../../tests/videos';
import { intersectionMockInstance, mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

describe('Videos component', () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword, pageToken) => {
      return keyword ? { data: [fakeVideo], nextPageToken: pageToken } : { data: fakeVideos, nextPageToken: pageToken };
    });
    mockAllIsIntersecting(true);
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
    mockAllIsIntersecting(false);
  });

  it('renders all videos when keyword is not specified', async () => {
    renderWithPath('/');
    const wrapper = await screen.findByTestId('wrapper');
    const instance = intersectionMockInstance(wrapper);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));

    expect(instance.observe).toHaveBeenCalledWith(wrapper);
    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined, undefined);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length + 1));
  });

  it('when keyword is specified, renders search results', async () => {
    const keyword = 'fake-keyword';
    renderWithPath(`/${keyword}`);
    const wrapper = await screen.findByTestId('wrapper');
    const instance = intersectionMockInstance(wrapper);

    await waitForElementToBeRemoved(() => screen.queryAllByTestId('skeleton'));

    expect(instance.observe).toHaveBeenCalledWith(wrapper);
    expect(fakeYoutube.search).toHaveBeenCalledWith(keyword, undefined);
    await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1 + 1));
  });

  it('renders loading state when items are being fetched', async () => {
    renderWithPath('/');
    const loadingWrapper = screen.getByTestId('wrapper');
    const skeletonComponents = screen.getAllByTestId('skeleton');

    expect(loadingWrapper).toBeInTheDocument();
    expect(skeletonComponents).toHaveLength(9);
  });

  it('renders error state when fetching items fails', async () => {
    fakeYoutube.search.mockImplementation(async () => {
      throw new Error('error');
    });
    renderWithPath('/');

    await waitFor(() => expect(screen.getByText('Somthing is wrong!')).toBeInTheDocument(), { timeout: 5000 });
  });

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path='/' element={<Videos />} />
            <Route path='/:keyword' element={<Videos />} />
          </>,
          path
        ),
        fakeYoutube
      )
    );
  }
});
