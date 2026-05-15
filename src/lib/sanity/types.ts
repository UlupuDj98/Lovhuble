export interface BlogPost {
  id: string;
  coverImage?: string;
  title: string;
  subtitle: string;
  category: string;
  excerpt?: string;
  body?: any[];
  author?: string;
  readTime?: string;
  date: string;
}
