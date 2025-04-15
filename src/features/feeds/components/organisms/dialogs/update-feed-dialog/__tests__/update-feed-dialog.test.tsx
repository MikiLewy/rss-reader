import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UpdateFeedDialog from '../update-feed-dialog';

describe('UpdateFeedDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
    feedId: '123',
    selectedFeedTitle: 'Test',
    selectedFeedDescription: 'Test',
  };

  afterEach(() => {
    props.open = true;
    props.selectedFeedTitle = 'Test';
    props.selectedFeedDescription = 'Test';
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<UpdateFeedDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should call onClose when cancel button is clicked', () => {
    render(<UpdateFeedDialog {...props} />);

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should initially disable confirm button', () => {
    render(<UpdateFeedDialog {...props} />);

    const confirmButton = screen.getByRole('button', {
      name: 'Update',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should display error message when title is invalid', async () => {
    render(<UpdateFeedDialog {...props} />);

    const titleInput = screen.getByRole('textbox', {
      name: 'Title',
    });

    fireEvent.change(titleInput, { target: { value: 'Test' } });
    fireEvent.blur(titleInput);
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.blur(titleInput);

    const errorMessage = await screen.findByText('This field is required');

    expect(errorMessage).toBeInTheDocument();
  });

  it('Should enable confirm button when form is valid', async () => {
    render(<UpdateFeedDialog {...props} />);

    const titleInput = screen.getByRole('textbox', {
      name: 'Title',
    });

    userEvent.type(titleInput, 'New title');

    const confirmButton = screen.getByRole('button', {
      name: 'Update',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
