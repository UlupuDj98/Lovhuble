import { GetStaticProps } from 'next';
import BlogPage from '@/app/pages/BlogPage';
import { client } from '@/app/lib/sanity/client';
import { blogPostsQuery } from '@/app/lib/sanity/queries';
import { BlogPost } from '@/app/lib/sanity/types';

interface Props {
  posts: BlogPost[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: BlogPost[] = await client.fetch(blogPostsQuery);
  return { props: { posts }, revalidate: 60 };
};

export default function BlogIndexPage({ posts }: Props) {
  return <BlogPage posts={posts} />;
}
