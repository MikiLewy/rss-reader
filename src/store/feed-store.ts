import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Feed {
  id: string;
  title: string;
  link: string;
  description: string;
  imageUrl: string;
}

export interface FeedArticle {
  id: string;
  feedId: string;
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  content: string;
  creator: string;
  alreadyRead: boolean;
}

export type FeedActions = {
  getFeedArticle: (feedArticleId: string) => FeedArticle | undefined;
  getFeedArticles: (feedId: string) => FeedArticle[];
  getFeed: (feedId: string) => Feed | undefined;
  updateFeed: ({ id, title, description }: { id: string; title: string; description: string }) => void;
  addFeed: (feed: Feed) => void;
  addFeedArticle: (feedArticle: FeedArticle) => void;
  removeFeed: (feedId: string) => void;
  updateFeedReadArticle: (feedArticleId: string, alreadyRead: boolean) => void;
};

interface FeedState {
  feeds: Feed[];
  feedArticles: FeedArticle[];
}

export const defaultState: FeedState = {
  feeds: [],
  feedArticles: [],
};

type FeedStore = FeedState & FeedActions;

export const useFeedStore = create<FeedStore>()(
  persist(
    (set, get) => ({
      ...defaultState,
      getFeedArticle: (feedArticleId: string) => {
        return get().feedArticles.find(feedArticle => feedArticle.id === feedArticleId);
      },
      getFeedArticles: (feedId: string) => {
        return get().feedArticles.filter(feedArticle => feedArticle.feedId === feedId);
      },
      getFeed: (feedId: string) => {
        return get().feeds.find(feed => feed.id === feedId);
      },
      updateFeed: ({ id, title, description }: { id: string; title: string; description: string }) => {
        set(state => ({
          feeds: state.feeds.map(f => (f.id === id ? { ...f, title, description } : f)),
        }));
      },
      addFeed: (feed: Feed) => {
        set(state => ({
          feeds: [...state.feeds, feed],
        }));
      },

      addFeedArticle: (feedArticle: FeedArticle) => {
        set(state => ({
          feedArticles: [...state.feedArticles, feedArticle],
        }));
      },
      updateFeedReadArticle: (feedArticleId: string, alreadyRead: boolean) => {
        set(state => ({
          feedArticles: state.feedArticles.map(f => (f.id === feedArticleId ? { ...f, alreadyRead } : f)),
        }));
      },
      removeFeed: (feedId: string) => {
        set(state => ({
          feeds: state.feeds.filter(feed => feed.id !== feedId),
          feedArticles: state.feedArticles.filter(feedArticle => feedArticle.feedId !== feedId),
        }));
      },
    }),
    { name: 'feeds' },
  ),
);
