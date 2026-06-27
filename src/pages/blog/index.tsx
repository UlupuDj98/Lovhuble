import { GetStaticProps } from 'next';
import { SEOHead } from '@/components/SEOHead'
import BlogPage from '@/views/BlogPage';
import { client } from '@/lib/sanity/client';
import { blogPostsQuery } from '@/lib/sanity/queries';
import { BlogPost } from '@/lib/sanity/types';

interface Props {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery);
  return { props: { posts }, revalidate: 60 };
};

export default function BlogIndexPage({ posts }: Props) {
  return (
    <>
      <SEOHead
        title="Blog sul benessere intimo — Lovehuble"
        description="Articoli, consigli e approfondimenti sul piacere, la salute sessuale e il benessere intimo. Aggiornato ogni settimana."
        canonical="/blog"
      />
      <BlogPage posts={posts} />
    </>
  )
}
