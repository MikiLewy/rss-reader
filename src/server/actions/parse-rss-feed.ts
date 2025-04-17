'use server';

import Parser from 'rss-parser';

import { Feed } from '@/server/types/feed';

export const parseRssFeed = async (url: string): Promise<Feed> => {
  const parser = new Parser<Feed>();

  const feed = await parser.parseURL(url);

  return feed;
};
