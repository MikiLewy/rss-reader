import { Item } from 'rss-parser';

export interface FeedItem extends Item {
  ['content:encoded']?: string;
}

export interface Feed {
  title: string;
  link: string;
  description: string;
  image?: {
    url: string;
    title: string;
    link: string;
  };
  items: FeedItem[];
}
