'use client';

import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

import DataUnavailable from '@/components/atoms/data-unavailable';
import { FormatDate } from '@/components/atoms/format-date';
import PageHeader from '@/components/organisms/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { dateFormats } from '@/constants/date-formats';
import { useFeedStore } from '@/store/feed-store';

import ArticleDescription from '../atoms/article-description';

interface Props {
  articleId: string;
}

const ArticleDetails = ({ articleId }: Props) => {
  const article = useFeedStore(state => state.getFeedArticle(articleId));

  const updateFeedReadArticle = useFeedStore(state => state.updateFeedReadArticle);

  const feed = useFeedStore.getState().getFeed(article?.feedId || '');

  if (!feed) {
    return <DataUnavailable title="Feed not found" />;
  }

  const handleMarkAsRead = () => {
    updateFeedReadArticle(article?.id || '', !article?.alreadyRead);
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Feeds</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/feeds/${feed?.id}`}>{feed?.title || 'Feed - Articles'}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article?.title || 'Article'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader title={article?.title || ''}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <Button onClick={handleMarkAsRead} variant="outline">
            {article?.alreadyRead ? 'Mark as unread' : 'Mark as read'}
          </Button>
          <Button asChild variant="outline">
            <Link href={article?.link || ''} target="_blank">
              <ExternalLink />
              Read more
            </Link>
          </Button>
        </div>
      </PageHeader>
      <div className="flex justify-between items-center gap-2">
        {article?.creator ? <p>{article?.creator}</p> : null}
        <FormatDate
          date={new Date(article?.pubDate || new Date())}
          format={`${dateFormats.dayShort} ${dateFormats.monthLong} ${dateFormats.year} ${dateFormats.hours}:${dateFormats.minutes}`}
        />
      </div>
      <ArticleDescription
        content={article?.content || ''}
        contentSnippet={article?.contentSnippet || ''}
        link={article?.link || ''}
      />
    </div>
  );
};

export default ArticleDetails;
