import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { search } = new URL(req.url);
  const apiUrl = `http://20.207.122.201/evaluation-service/notifications${search}`;
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: req.headers.get('authorization') || '',
    },
  });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
