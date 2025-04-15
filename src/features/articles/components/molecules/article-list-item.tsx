'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { FormatDate } from '@/components/atoms/format-date';
import { Separator } from '@/components/ui/separator';
import { dateFormats } from '@/constants/date-formats';
import { cn } from '@/lib/utils';

interface Props {
  feedId: string;
  articleId: string;
  title: string;
  contentSnippet: string;
  pubDate: Date;
  shouldDisplaySeparator: boolean;
  alreadyRead: boolean;
}

const ArticleListItem = ({
  feedId,
  articleId,
  title,
  contentSnippet,
  pubDate,
  shouldDisplaySeparator,
  alreadyRead,
}: Props) => {
  const router = useRouter();

  return (
    <>
      <article
        className={cn('flex flex-col gap-2 cursor-pointer', {
          'opacity-50': alreadyRead,
        })}
        onClick={() => router.push(`/feeds/${feedId}/${articleId}`)}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <h2 className="text-lg font-bold">{title || 'Missing title'}</h2>
            {alreadyRead ? (
              <p className="text-sm text-gray-700 flex items-center gap-2">
                Read
                <CheckCircle className="w-4 h-4 " />
              </p>
            ) : null}
          </div>
          <p className="text-sm text-gray-700">
            <FormatDate
              date={pubDate}
              format={`${dateFormats.dayShort} ${dateFormats.monthLong} ${dateFormats.year} ${dateFormats.hours}:${dateFormats.minutes}`}
            />
          </p>
        </div>
        <p className="text-sm text-gray-500">{contentSnippet || 'Missing article description'}</p>
      </article>
      {shouldDisplaySeparator ? <Separator /> : null}
    </>
  );
};

export default ArticleListItem;
