import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <nav aria-label="breadcrumb">
    <ol className="flex items-center flex-wrap gap-[6px] text-[14px] lg:text-[15px] text-[#6e6e73]">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-[6px]">
          {i > 0 && <ChevronRight className="w-[12px] h-[12px] flex-shrink-0 text-[#acacac]" strokeWidth={2} />}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#1d1d1f] transition-colors duration-200">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1d1d1f] font-medium truncate max-w-[200px]">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
