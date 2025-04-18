'use client';

import { Newspaper } from 'lucide-react';
import { useCallback, useState } from 'react';

import ActionsMenu from '@/components/atoms/actions-menu';
import ResultsCount from '@/components/atoms/results-count';
import SearchBar from '@/components/molecules/search-bar';
import PageHeader from '@/components/organisms/page-header';
import { useDialog } from '@/hooks/use-dialog';
import { useFeedStore } from '@/store/feed-store';

import Feed, { FeedPayload } from '../molecules/feed';
import RemoveFeedDialog from '../organisms/dialogs/remove-feed-dialog/remove-feed-dialog';
import UpdateFeedDialog from '../organisms/dialogs/update-feed-dialog/update-feed-dialog';
import FeedsPageHeaderActions from '../organisms/feeds-page-header-actions';

const FeedsList = () => {
  const feeds = useFeedStore(state => state.feeds);

  const [query, setQuery] = useState('');

  const filteredFeeds = feeds.filter(feed => feed.title.toLowerCase().includes(query.toLowerCase()));

  const [isOpenRemoveFeedDialog, handleOpenRemoveFeedDialog, handleCloseRemoveFeedDialog] = useDialog();

  const [isOpenUpdateFeedDialog, handleOpenUpdateFeedDialog, handleCloseUpdateFeedDialog] = useDialog();

  const [selectedFeed, setSelectedFeed] = useState<FeedPayload | null>(null);

  const actionsSlot = useCallback((payload: FeedPayload) => {
    const actions = [
      {
        key: 'update',
        label: 'Update',
        onClick: () => {
          setSelectedFeed(payload);
          handleOpenUpdateFeedDialog();
        },
      },
      {
        key: 'delete',
        label: 'Delete',
        onClick: () => {
          setSelectedFeed(payload);
          handleOpenRemoveFeedDialog();
        },
      },
    ];

    return <ActionsMenu actions={actions} />;
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Feeds" titleIcon={<Newspaper size={20} />}>
        <div className="flex items-center gap-2 ">
          <ResultsCount count={filteredFeeds?.length || 0} />
          <FeedsPageHeaderActions />
        </div>
      </PageHeader>
      <SearchBar query={query} handleChangeQuery={setQuery} />
      <ul className="flex flex-col gap-4 my-4">
        {filteredFeeds?.length > 0 ? (
          filteredFeeds.map(feed => (
            <Feed
              key={feed.id}
              id={feed.id}
              title={feed.title}
              description={feed.description}
              imageUrl={feed.imageUrl}
              actionsSlot={actionsSlot}
            />
          ))
        ) : (
          <p className="my-6 text-center text-gray-500">No available feeds</p>
        )}
      </ul>
      <UpdateFeedDialog
        open={isOpenUpdateFeedDialog}
        onClose={handleCloseUpdateFeedDialog}
        feedId={selectedFeed?.id || ''}
        selectedFeedTitle={selectedFeed?.title || ''}
        selectedFeedDescription={selectedFeed?.description || ''}
      />
      <RemoveFeedDialog
        open={isOpenRemoveFeedDialog}
        onClose={handleCloseRemoveFeedDialog}
        feedId={selectedFeed?.id || ''}
      />
    </div>
  );
};

export default FeedsList;
