import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateFeedDialog from '../create-feed-dialog';

describe('CreateFeedDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
  };

  afterEach(() => {
    props.open = true;
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<CreateFeedDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should call onClose when cancel button is clicked', () => {
    render(<CreateFeedDialog {...props} />);

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should initially disable confirm button', () => {
    render(<CreateFeedDialog {...props} />);

    const confirmButton = screen.getByRole('button', {
      name: 'Add',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should display error message when name is invalid', async () => {
    render(<CreateFeedDialog {...props} />);

    const feedUrlInput = screen.getByRole('textbox', {
      name: 'Feed URL',
    });

    fireEvent.change(feedUrlInput, { target: { value: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' } });
    fireEvent.blur(feedUrlInput);
    fireEvent.change(feedUrlInput, { target: { value: '' } });
    fireEvent.blur(feedUrlInput);

    const errorMessage = await screen.findByText('This field is required');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should enable confirm button when form is valid', async () => {
    render(<CreateFeedDialog {...props} />);

    const feedUrlInput = screen.getByRole('textbox', {
      name: 'Feed URL',
    });

    userEvent.type(feedUrlInput, 'https://www.nasa.gov/rss/dyn/breaking_news.rss');

    const confirmButton = screen.getByRole('button', {
      name: 'Add',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
