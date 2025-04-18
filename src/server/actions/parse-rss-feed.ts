'use server';

import Parser from 'rss-parser';

import { Feed } from '@/server/types/feed';

export const parseRssFeed = async (url: string): Promise<Feed> => {
  const parser = new Parser<Feed>();

  return parser.parseURL(url);
};
