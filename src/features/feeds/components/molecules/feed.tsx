import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface FeedPayload {
  id: string;
  title: string;
  description: string;
}

interface Props {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  actionsSlot: (payload: FeedPayload) => ReactNode;
}

const Feed = ({ id, title, description, imageUrl, actionsSlot }: Props) => {
  return (
    <Link href={`/feeds/${id}`}>
      <li className="flex items-center justify-between p-4 rounded-md bg-gray-50">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-6">
          <div className="relative min-h-20 min-w-20 rounded-md overflow-hidden">
            <Image src={imageUrl || '/placeholder.webp'} alt={title} fill className="object-cover  object-center" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
          }}>
          {actionsSlot({ id, title, description })}
        </div>
      </li>
    </Link>
  );
};

export default Feed;
