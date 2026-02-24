import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) return NextResponse.json({ error: 'URL required' }, { status: 400 });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const start = Date.now();
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal });
    const latency = Date.now() - start;
    clearTimeout(timeoutId);

    return NextResponse.json({ 
      online: res.ok, 
      status: res.status, 
      latency 
    });
  } catch (error) {
    return NextResponse.json({ online: false, latency: 0 });
  }
}