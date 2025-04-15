'use client';

import toast from 'react-hot-toast';

import Dialog, { DialogActions } from '@/components/organisms/dialog';
import { useFeedStore } from '@/store/feed-store';

interface Props extends DialogActions {
  feedId: string;
}

const RemoveFeedDialog = ({ open, onClose, feedId }: Props) => {
  const removeFeed = useFeedStore(state => state.removeFeed);

  const onSubmit = () => {
    removeFeed(feedId);

    onClose?.();

    toast.success('Feed removed successfully');
  };

  return (
    <Dialog open={open} onClose={onClose} title="Remove feed" confirmButtonText="Yes, remove" onSubmit={onSubmit}>
      <p>Are you sure you want to remove this feed? This action cannot be undone.</p>
    </Dialog>
  );
};

export default RemoveFeedDialog;
