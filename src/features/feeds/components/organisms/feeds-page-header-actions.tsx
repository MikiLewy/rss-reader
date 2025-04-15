'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import CreateFeedDialog from '@/features/feeds/components/organisms/dialogs/create-feed-dialog';
import { useDialog } from '@/hooks/use-dialog';

const FeedsPageHeaderActions = () => {
  const [isOpenAddFeedDialog, handleOpenAddFeedDialog, handleCloseAddFeedDialog] = useDialog();

  return (
    <>
      <Button size="default" className="cursor-pointer" onClick={handleOpenAddFeedDialog}>
        <Plus />
        Add feed
      </Button>
      <CreateFeedDialog open={isOpenAddFeedDialog} onClose={handleCloseAddFeedDialog} />
    </>
  );
};

export default FeedsPageHeaderActions;
