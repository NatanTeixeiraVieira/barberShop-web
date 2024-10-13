import { ComponentProps, } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FeedbackFormProps = ComponentProps<'form'>;

export default function FeedbackForm({
  children,
  className,
  ...rest
}: FeedbackFormProps) {
  // const [rating, setRating] = useState(0);
  // const [feedback, setFeedback] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Here you would typically send the feedback to your server
  //   console.log({ rating, feedback });
  //   setSubmitted(true);
  // };

  return (
    <div>
      {/* <h2 className="text-2xl font-bold mb-4">Feedback</h2> */}
      <form
        className={cn(
          'max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md',
          className,
        )}
        {...rest}
      >
        {children}
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}
