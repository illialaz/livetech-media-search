'use client';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SearchResult from '@/components/search-result';
import { useAppSelector } from '@/store';

export default function Favourites() {
  const likes = useAppSelector((state) => state.likes.value);

  return (
    <Container maxWidth="md" sx={{ pt: 3 }}>
      <Typography variant="h1" color="initial">
        Favourites
      </Typography>
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, sm: 2, md: 4 }}
        sx={{ pt: 3 }}
      >
        {likes.map((result) => (
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
            <SearchResult result={result} isStarred />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
