import { GetStaticPaths, GetStaticProps } from 'next';
import { SEOHead } from '@/components/SEOHead'
import BlogPostPage from '@/views/BlogPostPage';
import { client } from '@/lib/sanity/client';
import { blogPostsQuery, blogPostBySlugQuery } from '@/lib/sanity/queries';
import { BlogPost } from '@/lib/sanity/types';

interface Props {
  post: BlogPost;
  allPosts: BlogPost[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery);
  return {
    paths: posts.map((post) => ({ params: { id: post.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const id = params?.id as string;
  const [post, allPosts] = await Promise.all([
    client.fetch<BlogPost | null>(blogPostBySlugQuery, { slug: id }),
    client.fetch<BlogPost[]>(blogPostsQuery),
  ]);

  if (!post) return { notFound: true };

  return { props: { post, allPosts }, revalidate: 60 };
};

export default function BlogPostRoute({ post, allPosts }: Props) {
  return (
    <>
      <SEOHead
        title={`${post.title} — Blog Lovehuble`}
        description={post.excerpt ?? post.subtitle}
        canonical={`/blog/${post.id}`}
        ogImage={post.coverImage}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt ?? post.subtitle,
          image: post.coverImage,
          datePublished: post.date,
          author: post.author
            ? { '@type': 'Person', name: post.author }
            : { '@type': 'Organization', name: 'Lovehuble' },
          publisher: {
            '@type': 'Organization',
            name: 'Lovehuble',
            logo: {
              '@type': 'ImageObject',
              url: 'https://lovehuble.com/logo-1.png',
            },
          },
        }}
      />
      <BlogPostPage post={post} allPosts={allPosts} />
    </>
  )
}
