export async function load({ params, url }) {
  const accessTokenRes = await fetch(`http://localhost:8080/api/spotify_access_token/${url.searchParams.get('code')!}`)
  const accessToken = await accessTokenRes.text();

  return { accessToken };
}