import { groq } from "next-sanity";

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    "id": slug.current,
    "coverImage": coverImage.asset->url,
    title,
    subtitle,
    category,
    excerpt,
    body,
    author,
    readTime,
    "date": publishedAt,
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    "id": slug.current,
    "coverImage": coverImage.asset->url,
    title,
    subtitle,
    category,
    excerpt,
    body,
    author,
    readTime,
    "date": publishedAt,
  }
`;

