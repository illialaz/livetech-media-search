'use server';

import type { ITunesResponse } from '@/types/itunes';

const PER_PAGE = 20;

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url || '');
  const search = searchParams.get('search');
  const media = searchParams.get('media');
  const page = parseInt(searchParams.get('page') || '0', 10);

  const offset = page * PER_PAGE;

  if (!search) {
    return Response.json(
      { error: 'Set search and media queryparams correctly' },
      { status: 400 },
    );
  }

  try {
    const { results, resultCount } = await fetch(
      `${process.env.API_URL}?${new URLSearchParams({ term: search.split(' ').join('+'), ...(media && { media }), limit: String(PER_PAGE), offset: String(offset) }).toString()}`,
    ).then(async (data) => (await data.json()) as ITunesResponse);

    return Response.json({ results, resultCount }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Bad request' }, { status: 400 });
  }
}
