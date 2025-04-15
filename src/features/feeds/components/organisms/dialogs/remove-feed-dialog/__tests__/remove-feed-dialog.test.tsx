import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import RemoveFeedDialog from '../remove-feed-dialog';

describe('RemoveFeedDialog', () => {
  const props = {
    open: true,
    onClose: vi.fn(),
    feedId: '123',
  };

  afterEach(() => {
    props.open = true;
  });

  it('Should not render dialog when open is false', () => {
    props.open = false;

    render(<RemoveFeedDialog {...props} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('Should call onClose when cancel button is clicked', () => {
    render(<RemoveFeedDialog {...props} />);

    const cancelButton = screen.getByRole('button', {
      name: 'Cancel',
    });

    fireEvent.click(cancelButton);

    expect(props.onClose).toHaveBeenCalled();
  });

  it('Should disable confirm button when feed id is not valid', () => {
    render(<RemoveFeedDialog {...props} feedId="" />);

    const confirmButton = screen.getByRole('button', {
      name: 'Yes, remove',
    });

    expect(confirmButton).toBeDisabled();
  });

  it('Should initially enable confirm button', async () => {
    render(<RemoveFeedDialog {...props} />);

    const confirmButton = screen.getByRole('button', {
      name: 'Yes, remove',
    });

    await waitFor(() => expect(confirmButton).toBeEnabled());
  });
});
