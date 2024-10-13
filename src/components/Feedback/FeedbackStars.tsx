import { Star } from 'lucide-react';

type FeedbackStarsProps = {
  rating?: number;
  onStarClick?: (starNumber: number) => void;
};

export default function FeedbackStars({
  rating = 0,
  onStarClick,
}: FeedbackStarsProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-8 h-8 cursor-pointer ${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
            onClick={() => onStarClick && onStarClick(star)}
          />
        ))}
      </div>
    </div>
  );
}
