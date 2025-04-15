import { Articles } from '@/features/articles/components/templates/articles';

export default async function FeedArticlesPage({ params }: { params: Promise<{ feedId: string }> }) {
  const { feedId } = await params;

  return <Articles feedId={feedId} />;
}
