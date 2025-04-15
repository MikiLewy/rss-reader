import { parser } from '../clients/rss-parser';
import { Feed } from '../types/feed';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const getRssFeed = async (url: string): Promise<Feed> => {
  const feed = await parser.parseURL(CORS_PROXY + url);

  return feed;
};
