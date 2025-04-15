import Link from 'next/link';
import sanitizeHtml from 'sanitize-html';

interface Props {
  content: string;
  contentSnippet: string;
  link: string;
}

const ArticleDescription = ({ content, contentSnippet, link }: Props) => {
  const sanitized = sanitizeHtml(content || '', {
    allowedTags: ['p', 'img', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'strong', 'em', 'a'],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt', 'title'],
    },
    disallowedTagsMode: 'discard',
    exclusiveFilter: frame => {
      const isGarbageClass = /related|nav|footer|sidebar|promo|ad/i.test(frame.attribs?.class || '');
      const isEmptyList = (frame.tag === 'ul' || frame.tag === 'ol') && !frame.text.trim().length;

      return isGarbageClass || isEmptyList;
    },
  });

  return sanitized ? (
    <div
      className="prose prose-sm md:prose lg:prose-lg min-w-full max-w-full overflow-hidden prose-img:w-full prose-img:max-h-[550px] prose-img:object-cover prose-img:object-center prose-img:my-4"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  ) : (
    contentSnippet || (
      <p className="text-gray-500">
        No content available.{' '}
        <Link href={link || ''} className="text-gray-500 underline" target="_blank">
          Read on the website
        </Link>
      </p>
    )
  );
};

export default ArticleDescription;
