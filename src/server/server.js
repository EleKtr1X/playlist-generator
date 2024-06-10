import express from 'express';
import cors from 'cors';
const app = express()
const SPOTIFY_ID = 'your spotify id here'
const SPOTIFY_SECRET = 'your spotify secret here'

app.use(cors())

app.get('/api/spotify_id', (req, res) => {
  console.log('spotify_id')
  res.send(SPOTIFY_ID)
})

app.get('/api/spotify_secret', (req, res) => {
  console.log('spotify_secret')
  res.send(SPOTIFY_SECRET)
})

app.get('/api/gpt_key', (req, res) => {
  console.log('gpt_key')
  res.send('your gpt key here')
})

app.get('/api/spotify_access_token/:code', async (req, res) => {
  console.log('spotify_access_token')
  const tmp = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`);
  const reqParams = new URLSearchParams();
  reqParams.set('code', req.params.code);
  reqParams.set('redirect_uri', 'https://elektr1x.github.io/playlist-generator/generate');
  // reqParams.set('redirect_uri', 'http://localhost:5173/playlist-generator/generate');
  reqParams.set('grant_type', 'authorization_code');

  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${tmp.toString('base64')}`,
    },
    body: reqParams,
  });
  const json = await resp.json();
  const accessToken = json.access_token;
  console.log(json)
  res.send(accessToken);
})

app.listen(8080, () => {
  console.log('App started')
})