import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, useLocation } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../tests/utils';
import { fakeVideo as video } from '../../tests/videos';
import VideoCard from '../VideoCard';

describe('VideoCard', () => {
  it('renders grid type correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<VideoCard video={video} type='grid' />} />) //
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders list type correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<VideoCard video={video} type='list' />} />) //
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('navigates to detailed video page with video state when clicked', () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
        </>
      )
    );

    const card = screen.getByRole('listitem');
    userEvent.click(card);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
