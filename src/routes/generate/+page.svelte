<script lang="ts">
  import SpotifyWebApi from 'spotify-web-api-node';
  import OpenAI from 'openai';
  import { getSuggestions } from '../../api/gpt.js';

  /** @type {import('./$types').PageData} */
  export let data;
  const client = new SpotifyWebApi();
  client.setAccessToken(data.accessToken);

  // client.createPlaylist('Playlist', {
  //   description: 'This playlist was made using playlist-generator'
  // }).then(() => {
  //   console.log('wow')
  // })

  
  client.getAvailableGenreSeeds().then(async res => {
    const gptKeyRes = await fetch(`http://localhost:8080/api/gpt_key`)
    const gptKey = await gptKeyRes.text();
  
    const openai = new OpenAI({ apiKey: gptKey });
    const suggestions = await getSuggestions(openai, res.body.genres, 'chilling in room doing work', 4);
    console.log(suggestions)
    client.getRecommendations({
      seed_genres: suggestions,
    }).then(res => {
      console.log(res.body.tracks)
    })
  })
</script>

<h1>Generate</h1>
<p>{client}</p>