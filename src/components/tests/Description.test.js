import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Description from '../Description';
import * as element from '../../util/element';

describe('Description', () => {
  const h2Ref = { current: { scrollIntoView: jest.fn() } };
  const shortDescription = 'This is a short description.';
  const longDescription = `
        This is a long description that overflows. 1
        This is a long description that overflows. 2
        This is a long description that overflows. 3
        This is a long description that overflows. 4
        This is a long description that overflows. 5
      `;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders description without a "더보기" button when no overflow', async () => {
    jest.spyOn(element, 'checkOverflow').mockImplementation(() => false);

    act(() => {
      render(<Description h2Ref={h2Ref} description={shortDescription} />);
    });

    const moreButton = screen.queryByText('...더보기');
    expect(moreButton).not.toBeInTheDocument();
  });

  it('renders description with a "더보기" button when overflow', async () => {
    jest.spyOn(element, 'checkOverflow').mockImplementation(() => true);

    act(() => {
      render(<Description h2Ref={h2Ref} description={longDescription} />);
    });

    const moreButton = await screen.findByRole('button', { name: '...더보기' });
    expect(moreButton).toBeInTheDocument();
  });

  it('renders "간략히" button when the "더보기" button is clicked', async () => {
    jest.spyOn(element, 'checkOverflow').mockImplementation(() => true);

    act(() => {
      render(<Description h2Ref={h2Ref} description={longDescription} />);
    });

    const moreButton = await screen.findByRole('button', { name: '...더보기' });
    fireEvent.click(moreButton);

    const shortButton = await screen.findByRole('button', { name: '간략히' });
    expect(shortButton).toBeInTheDocument();
    expect(moreButton).not.toBeInTheDocument();
  });
});
