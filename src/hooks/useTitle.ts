import { baseTitle } from '@/constants/general';
import { useEffect } from 'react';

export const useTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - ${baseTitle}`;
    }
  }, [title]);
};
