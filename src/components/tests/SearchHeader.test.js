import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import { withRouter } from '../../tests/utils';
import SearchHeader from '../SearchHeader';
import userEvent from '@testing-library/user-event';

describe('SearchHeader', () => {
  it('renders correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<SearchHeader />} />) //
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with keyword correctly', () => {
    render(
      withRouter(<Route path='/:keyword' element={<SearchHeader />} />, '/bts') //
    );
    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
  });

  it('navigates to result page on search button clicked', () => {
    const keyword = 'fake keyword';
    render(
      withRouter(
        <>
          <Route path='/' element={<SearchHeader />} />
          <Route path={`/videos/${keyword}`} element={<p>{`Search result for ${keyword}`}</p>} />
        </>
      )
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByTitle('search');
    userEvent.type(searchInput, keyword);
    userEvent.click(searchButton);

    expect(screen.getByText(`Search result for ${keyword}`)).toBeInTheDocument();
  });
});
