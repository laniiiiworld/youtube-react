import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import { withAllContexts, withRouter } from '../../tests/utils';
import SearchArea from '../SearchArea';
import userEvent from '@testing-library/user-event';

describe('SearchArea', () => {
  let isMobile;
  let isShow;

  it('renders correctly in desktop mode', () => {
    isMobile = false;
    isShow = true;
    const component = renderer.create(
      withAllContexts(
        withRouter(
          <Route
            path='/'
            element={<SearchArea isMobile={isMobile} isShow={isShow} handleClose={() => (isShow = false)} />}
          />
        ) //
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders correctly in mobile mode', () => {
    isMobile = true;
    isShow = false;
    const component = renderer.create(
      withAllContexts(
        withRouter(
          <Route
            path='/'
            element={<SearchArea isMobile={isMobile} isShow={isShow} handleClose={() => (isShow = false)} />}
          />
        ) //
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('shows search form when you click search button in mobile mode', () => {
    isMobile = true;
    isShow = true;
    const component = renderer.create(
      withAllContexts(
        withRouter(
          <Route
            path='/'
            element={<SearchArea isMobile={isMobile} isShow={isShow} handleClose={() => (isShow = false)} />}
          />
        ) //
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with keyword correctly', () => {
    isMobile = false;
    isShow = true;

    render(
      withAllContexts(
        withRouter(
          <Route
            path='/:keyword'
            element={<SearchArea isMobile={isMobile} isShow={isShow} handleClose={() => (isShow = false)} />}
          />,
          '/bts'
        ) //
      )
    );

    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  it('navigates to result page on search button clicked', () => {
    const keyword = 'fake keyword';
    isMobile = false;
    isShow = true;

    render(
      withAllContexts(
        withRouter(
          <>
            <Route
              path='/'
              element={<SearchArea isMobile={isMobile} isShow={isShow} handleClose={() => (isShow = false)} />}
            />
            <Route path={`/videos/${keyword}`} element={<p>{`Search result for ${keyword}`}</p>} />
          </>
        )
      )
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByTestId('search');
    userEvent.type(searchInput, keyword);
    userEvent.click(searchButton);

    expect(screen.getByText(`Search result for ${keyword}`)).toBeInTheDocument();
  });
});
