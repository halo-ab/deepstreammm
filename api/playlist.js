export const config = { runtime: "edge" };

const PLAYLIST_URL =
  "https://raw.githubusercontent.com/sm-monirulislam/FanCode-Auto-Update-Playlist/refs/heads/main/fancode_in.m3u";

export default async function handler() {
  try {
    const upstream = await fetch(PLAYLIST_URL, {
      headers: {
        "User-Agent": "DeepStream/1.0",
        Accept: "text/plain, application/vnd.apple.mpegurl, */*",
      },
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new Response(`Upstream ${upstream.status}`, { status: upstream.status });
    }

    const text = await upstream.text();
    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.mpegurl; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err) {
    return new Response(`Playlist error: ${err.message}`, { status: 502 });
  }
}
