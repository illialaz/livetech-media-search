import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ITunesEnum } from '@/types/itunes';
import { formValidators } from '@/utils/validators';

type SearchFields = { search: string; media: ITunesEnum };

type SearchBarProps = {
  search?: string;
  media?: ITunesEnum;
  setSearch: (search: string) => void;
  setMedia: (media: ITunesEnum) => void;
};

const mediaMap: Record<ITunesEnum, string> = {
  [ITunesEnum.All]: 'Any',
  [ITunesEnum.Audiobook]: 'Audiobooks',
  [ITunesEnum.Ebook]: 'Ebooks',
  [ITunesEnum.Movie]: 'Movies',
  [ITunesEnum.Music]: 'Music',
  [ITunesEnum.MusicVideo]: 'Music with video',
  [ITunesEnum.Podcast]: 'Podcasts',
  [ITunesEnum.ShortFilm]: 'Short film',
  [ITunesEnum.Software]: 'Software',
  [ITunesEnum.TvShow]: 'TV show',
};

const mediaSequence = [
  ITunesEnum.All,
  ITunesEnum.Movie,
  ITunesEnum.Podcast,
  ITunesEnum.Audiobook,
  ITunesEnum.Ebook,
  ITunesEnum.Music,
  ITunesEnum.MusicVideo,
  ITunesEnum.TvShow,
  ITunesEnum.ShortFilm,
  ITunesEnum.Software,
];

export default function SearchBar({
  search,
  media,
  setSearch,
  setMedia,
}: SearchBarProps) {
  const [isError, setError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFields>({
    mode: 'onBlur',
    defaultValues: {
      search: '',
      media: ITunesEnum.All,
    },
  });

  useEffect(() => {
    reset({ search: search, media: media });
  }, [media, reset, search]);

  const handlerFormData = async ({ search, media }: SearchFields) => {
    setIsButtonDisabled(true);
    try {
      setSearch(search);
      setMedia(media);
      setError(false);
    } catch (e) {
      setError(true);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const onSubmit = (e: React.BaseSyntheticEvent) => {
    handleSubmit(handlerFormData)(e).finally(() => {});
  };

  return (
    <form onSubmit={onSubmit} method="post" target="_top" action-xhr="#">
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Controller
          render={({ field: { value, onChange } }) => (
            <TextField
              id="search"
              label="Search *"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={isError || !!errors['search']}
            />
          )}
          rules={{ validate: formValidators.required() }}
          control={control}
          name="search"
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel id="media-select-label">Media</InputLabel>
        <Controller
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              labelId="media-select-label"
              id="media"
              label="Media"
            >
              {mediaSequence.map((seq) => (
                <MenuItem key={seq} value={seq}>
                  {mediaMap[seq]}
                </MenuItem>
              ))}
            </Select>
          )}
          control={control}
          name="media"
        />
        {/* <Select
          labelId="media-select-label"
          id="media"
          label="Media"
          {...register('media')}
        >
          {mediaSequence.map((seq) => (
            <MenuItem key={seq} value={seq}>
              {mediaMap[seq]}
            </MenuItem>
          ))}
        </Select> */}
      </FormControl>

      <FormControl fullWidth>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isButtonDisabled}
          sx={{ mt: 3, py: 2 }}
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
}
