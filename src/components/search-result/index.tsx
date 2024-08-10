import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { ReactComponent as Star } from 'public/star.svg';

import { useAppDispatch } from '@/store';
import { dislike, like } from '@/store/likesSlice';
import type { ITunesResult } from '@/types/itunes';

type SearchResultProps = {
  result: ITunesResult;
  isStarred: boolean;
};

export default function SearchResult({ result, isStarred }: SearchResultProps) {
  const {
    trackName,
    artistName,
    collectionName,
    artworkUrl100,
    trackViewUrl,
    previewUrl,
  } = result;

  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        position: 'relative',
        transition: 'all 0.2s cubic-bezier(.67,.02,.48,.97)',
        '&:hover': {
          transform: ['scale(1.03)', 'scale(1.05)', 'scale(1.1)'],
          svg: {
            opacity: 1,
          },
        },
      }}
    >
      {artworkUrl100 && (
        <Image
          src={artworkUrl100}
          alt={trackName}
          width={480}
          height={480}
          style={{
            objectFit: 'contain',
            width: '100%',
            height: 'auto',
            aspectRatio: '1 / 1',
          }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          m: 1,
          cursor: 'pointer',

          svg: {
            height: 20,
            opacity: 0,
            transition: 'all 0.2s cubic-bezier(.67,.02,.48,.97)',
          },
          path: {
            transition: 'all 0.2s cubic-bezier(.67,.02,.48,.97)',
            filter: 'drop-shadow( 0 0 5px rgba(0,0,0,0.1))',
            ...(!isStarred && { fill: 'white' }),
          },

          '&:hover': {
            path: {
              fill: '#ffe234',
            },
          },

          '&:active': {
            path: {
              fill: isStarred ? 'white' : '#ffe234',
            },
          },
        }}
        onClick={() => dispatch(isStarred ? dislike(result) : like(result))}
      >
        <Star />
      </Box>
      {(trackViewUrl || previewUrl) && (
        <Link
          href={trackViewUrl || previewUrl || ''}
          style={{
            width: '100%',
            height: '80%',
            position: 'absolute',
            bottom: 0,
            display: 'block',
            zIndex: 1,
          }}
        />
      )}
      <Box
        flexDirection="column"
        alignItems="center"
        sx={{
          width: '100%',
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          pb: 2,
          '*': { textShadow: '0 0 10px black' },
        }}
      >
        <Typography
          variant="caption"
          fontWeight="bold"
          color="white"
          zIndex={2}
        >
          {artistName}
        </Typography>
        <Typography
          variant="caption"
          fontWeight="bold"
          color="white"
          zIndex={2}
        >
          {trackName}
        </Typography>
        <Typography
          variant="caption"
          fontWeight="bold"
          color="white"
          zIndex={2}
        >
          {collectionName}
        </Typography>
      </Box>
    </Box>
  );
}
