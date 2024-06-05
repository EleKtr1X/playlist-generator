<script lang="ts">
  import SpotifyWebApi from 'spotify-web-api-node';
  import OpenAI from 'openai';
  import { getSuggestions } from '../../api/gpt.js';
  import { beforeUpdate, onMount } from 'svelte';
  import { page } from '$app/stores';

  /** @type {import('./$types').PageData} */
  // export let data;
  // let accessToken = '';
  onMount(async () => {
    // console.log($page.url.searchParams.get('code'))
    const accessTokenRes = await fetch(`http://localhost:8080/api/spotify_access_token/${$page.url.searchParams.get('code')!}`)
    const accessToken = await accessTokenRes.text();
    console.log(accessToken)
    const client = new SpotifyWebApi();
    client.setAccessToken(accessToken);
    client.getAvailableGenreSeeds().then(async res => {
      const gptKeyRes = await fetch(`http://localhost:8080/api/gpt_key`)
      const gptKey = await gptKeyRes.text();
      console.log(res)
    
      const openai = new OpenAI({ apiKey: gptKey, dangerouslyAllowBrowser: true });
      const suggestions = await getSuggestions(openai, res.body.genres, 'chilling in room doing work', 4);
      console.log(suggestions)
      client.getRecommendations({
        seed_genres: suggestions,
      }).then(res => {
        console.log(res.body.tracks)
      })
    })
  })

  // client.createPlaylist('Playlist', {
  //   description: 'This playlist was made using playlist-generator'
  // }).then(() => {
  //   console.log('wow')
  // })

  
</script>

<h1>Generate</h1>
<!-- <p></p> -->