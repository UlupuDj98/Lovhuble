import { Star } from 'lucide-react';

interface ProductRatingProps {
  rating?: number;
  max?: number;
}

export const ProductRating = ({ rating = 4, max = 5 }: ProductRatingProps) => (
  <div className="flex items-center justify-center gap-[4px]">
    {Array.from({ length: max }, (_, i) => (
      <Star
        key={i}
        className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]"
        fill={i < rating ? '#d4a5a5' : 'none'}
        stroke="#d4a5a5"
        strokeWidth={1.5}
      />
    ))}
  </div>
);
