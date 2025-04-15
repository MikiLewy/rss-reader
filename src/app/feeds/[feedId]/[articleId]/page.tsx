import Article from '@/features/articles/components/templates/article-details';

export default async function FeedPage({ params }: { params: Promise<{ articleId: string }> }) {
  const { articleId } = await params;

  return <Article articleId={articleId} />;
}
