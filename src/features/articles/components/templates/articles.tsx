'use client';

import { useMemo, useState } from 'react';

import DataUnavailable from '@/components/atoms/data-unavailable';
import ResultsCount from '@/components/atoms/results-count';
import SearchBar from '@/components/molecules/search-bar';
import PageHeader from '@/components/organisms/page-header';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useFeedStore } from '@/store/feed-store';

import ArticleListItem from '../molecules/article-list-item';

interface Props {
  feedId: string;
}

export const Articles = ({ feedId }: Props) => {
  const [query, setQuery] = useState('');

  const feed = useFeedStore.getState().getFeed(feedId);

  const articles = useFeedStore.getState().getFeedArticles(feedId);

  const sortedArticles = articles?.sort((a, b) => {
    return new Date(b?.pubDate || new Date()).getTime() - new Date(a?.pubDate || new Date()).getTime();
  });

  const filteredArticles = useMemo(() => {
    return sortedArticles?.filter(article => article.title.toLowerCase().includes(query.toLowerCase()));
  }, [sortedArticles, query]);

  if (!feed) {
    return <DataUnavailable title="No feed found" />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Feeds</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Articles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader title={`${feed?.title} - Articles`}>
        <ResultsCount count={filteredArticles?.length || 0} />
      </PageHeader>
      <SearchBar query={query} handleChangeQuery={setQuery} />
      <div className="my-4 flex flex-col gap-4">
        {filteredArticles?.length > 0 ? (
          filteredArticles.map((article, index) => (
            <ArticleListItem
              key={article.id}
              feedId={feedId}
              articleId={article.id}
              title={article.title}
              contentSnippet={article.contentSnippet}
              pubDate={new Date(article.pubDate || new Date())}
              alreadyRead={article.alreadyRead}
              shouldDisplaySeparator={index !== sortedArticles.length - 1}
            />
          ))
        ) : (
          <p className="my-6 text-center text-gray-500">No available articles</p>
        )}
      </div>
    </div>
  );
};
