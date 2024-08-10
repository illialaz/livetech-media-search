import { useCallback } from 'react';

export const useInfiniteScroll = ({
  observer,
  page,
  isLoading,
  isEnd,
  setLoading,
  setPage,
}: {
  observer: React.MutableRefObject<IntersectionObserver | undefined>;
  page: number;
  isLoading: boolean;
  isEnd: boolean;
  setLoading: (loading: boolean) => void;
  setPage: (page: number) => void;
}) => {
  const fetchData = useCallback(() => {
    setLoading(true);
    setPage(page + 1);
  }, [page, setLoading, setPage]);

  const dataFetcherElem = useCallback(
    (node: Element) => {
      if (isLoading || isEnd) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchData, isEnd, isLoading, observer],
  );

  return { dataFetcherElem };
};
