import type { ITunesResponse } from '@/types/itunes';

export const itunesFetcher = async ({
  page,
  search,
  media,
}: {
  page: number;
  search: string;
  media?: string;
}): Promise<ITunesResponse> => {
  if (!search) {
    return { results: [], resultCount: 0 };
  }

  const data = await fetch(
    `/api/itunes?${new URLSearchParams({ search, ...(media && { media }), page: String(page) }).toString()}`,
  )
    .then(async (res) => {
      if (res.status !== 200) {
        const { error } = (await res.json()) as { error: string };

        throw new Error(error);
      }

      return res;
    })
    .then(async (res) => (await res.json()) as ITunesResponse)
    .then((res) => ({
      ...res,
      results: res.results.map((result) => ({
        ...result,
        artworkUrl100: result.artworkUrl100?.replace('100x100', '480x480'),
      })),
    }));

  return data;
};
