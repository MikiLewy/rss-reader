import Parser from 'rss-parser';

import { Feed } from '../types/feed';

export const parser = new Parser<Feed>();
