'use client';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import SearchResult from '@/components/search-result';
import { useInfiniteScroll } from '@/hooks/infiniteScroll';
import { useAppSelector } from '@/store';
import type { ITunesResponse, ITunesResult } from '@/types/itunes';
import { ITunesEnum } from '@/types/itunes';

import SearchBar from './components/search-bar';
import { itunesFetcher } from './utils/itunesFetcher';

const Span = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled('span')(({ theme }) => ({
  width: '2rem',
  height: '2rem',
  border: `5px solid ${theme.palette.text.primary}`,
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
}));

export default function Homepage() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [media, setMedia] = useState<ITunesEnum | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const [isEnd, setEnd] = useState(false);

  const handleSearch = useCallback((s: string) => setSearch(s), []);
  const handleMedia = useCallback((m: ITunesEnum) => setMedia(m), []);
  const handleLoading = useCallback((l: boolean) => setLoading(l), []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const getKey = (pageIndex: number, previousPageData?: ITunesResponse) => {
    if (!search) {
      return null;
    }

    if (previousPageData && !previousPageData.results.length) {
      setEnd(true);
      return null;
    }

    return { page: pageIndex, search, media };
  };

  const infiniteScrollLoadRef = useRef<IntersectionObserver>();

  const {
    data,
    size: page,
    setSize: setPage,
    isLoading: firstLoading,
  } = useSWRInfinite(getKey, itunesFetcher);

  const newData = useMemo(() => {
    setLoading(false);
    return (
      data?.reduce(
        (acc, { results }) => [...acc, ...results],
        [] as ITunesResult[],
      ) || ([] as ITunesResult[])
    );
  }, [data]);

  const resultCount = useMemo(() => {
    return data?.reduce((acc, item) => acc + item.resultCount, 0) || 0;
  }, [data]);

  const { dataFetcherElem } = useInfiniteScroll({
    observer: infiniteScrollLoadRef,
    page,
    isLoading,
    isEnd,
    setLoading: handleLoading,
    setPage,
  });

  useEffect(() => {
    setPage(1);
    setEnd(false);
  }, [setPage, media, search]);

  useEffect(() => {
    const m = searchParams.get('media');
    const s = searchParams.get('search');

    if ((media || search || s || m) && (s !== search || m !== media)) {
      const newSearch = s !== search ? search : s;
      const newMedia = m !== media ? media : m;

      return router.replace(
        `/?${new URLSearchParams({ ...(newSearch && { search: newSearch }), ...(newMedia && { media: newMedia }) })}`,
      );
    }
  }, [searchParams, media, search, router]);

  useEffect(() => {
    const m = searchParams.get('media');
    const s = searchParams.get('search');

    if (m && Object.values(ITunesEnum).includes(m as ITunesEnum)) {
      setMedia(m as ITunesEnum);
    }

    if (s) {
      setSearch(s);
    }
  }, [searchParams]);

  const likes = useAppSelector((state) => state.likes.value);

  return (
    <Container maxWidth="md" sx={{ pt: 3 }}>
      <Typography variant="h1">Media search</Typography>
      <SearchBar
        media={media}
        search={search}
        setSearch={handleSearch}
        setMedia={handleMedia}
      />
      <Box sx={{ pt: 2, position: 'relative' }}>
        {search && (
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h4" display="inline">
              {resultCount > 0
                ? 'Results for '
                : `${firstLoading ? 'Searching for ' : 'Nothing found for '}`}
              <Span>{search}</Span>
            </Typography>
          </Box>
        )}
        <Grid
          container
          spacing={2}
          columns={{ xs: 1, sm: 2, md: 4 }}
          sx={{ pt: 2 }}
        >
          {newData.map((result) => (
            <Grid
              item
              xs={1}
              key={
                result.artistName +
                result.collectionName +
                result.kind +
                result.wrapperType +
                result.trackName
              }
            >
              <SearchResult
                result={result}
                isStarred={likes.some(
                  (i) =>
                    i.trackName === result.trackName &&
                    i.artistName === result.artistName &&
                    i.collectionName === result.collectionName,
                )}
              />
            </Grid>
          ))}
        </Grid>
        {newData.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '100vh',
              width: '100%',
            }}
            ref={dataFetcherElem}
          />
        )}
        {isLoading && !isEnd && (
          <Typography
            variant="h4"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Loading
            <Loader sx={{ ml: 1, animation: `${spin} 1s linear infinite` }} />
          </Typography>
        )}
      </Box>
    </Container>
  );
}
