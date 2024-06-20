<script lang="ts">
  import SpotifyWebApi from 'spotify-web-api-node';
  import OpenAI from 'openai';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getNameDescription, getSuggestions } from '../../api/gpt';

  const client = new SpotifyWebApi();
  let openai: OpenAI;
  onMount(async () => {
    const accessTokenRes = await fetch(`https://ec2-54-196-142-211.compute-1.amazonaws.com:8080/api/spotify_access_token/${$page.url.searchParams.get('code')!}`)
    const accessToken = await accessTokenRes.text();
    console.log(accessToken)
    client.setAccessToken(accessToken);
  //   client.getAvailableGenreSeeds().then(async res => {
    const gptKeyRes = await fetch(`https://ec2-54-196-142-211.compute-1.amazonaws.com:8080/api/gpt_key`)
    const gptKey = await gptKeyRes.text();
    
    openai = new OpenAI({ apiKey: gptKey, dangerouslyAllowBrowser: true });
      //   })
  });
      
  let playlistName = '';
  let mood = '';
  let playlistNumSongs = 55;
  let playlistNewPercent = 0.75;
  let playlistNumGenres = 3;
  let playlistLink = '';

  let generated = false;
  let generating = false;
      
  async function generate() {
    generating = true;
    // get all genres
    const genres = (await client.getAvailableGenreSeeds()).body.genres;
    // generate genre suggestions
    const suggestions = await getSuggestions(openai, genres, mood, playlistNumGenres);
    console.log('suggestions:', suggestions)

    // generate name and description
    const playlistText = await getNameDescription(openai, suggestions, mood)
    if (playlistName == '') playlistName = playlistText.playlistName;
    
    // create playlist
    const playlist = (await client.createPlaylist(playlistName, { description: playlistText.playlistDescription })).body;
    await client.changePlaylistDetails(playlist.id, { public: true });
    console.log('playlist id:', playlist.id, playlist.public);
    
    // add tracks to playlist
    const playlistNumNewSongs = Math.ceil(playlistNewPercent * playlistNumSongs)
    const newTracks = (await client.getRecommendations({ seed_genres: suggestions, limit: playlistNumNewSongs })).body.tracks;
    let likedTracks: any[] = [];
    if ((playlistNumSongs - playlistNumNewSongs) > 0) {
      likedTracks = (await client.getMySavedTracks({ limit: (playlistNumSongs - playlistNumNewSongs) })).body.items;
    }
    const tracks = newTracks.map(track => `spotify:track:${track.id}`).concat(likedTracks.map(track => `spotify:track:${track.track.id}`));
    await client.addTracksToPlaylist(playlist.id, shuffle(tracks));

    playlistLink = `https://open.spotify.com/playlist/${playlist.id}`;
    generated = true;
  }

  function shuffle(array: string[]) { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

</script>

<header class="main-header">
  <img src="logo.jpg" alt="Spotiflow Logo" class="logo">
  <h1>Spotiflow</h1>
</header>
<div class="container">
  <div class="left-half">
    <h2 class="inputs-header">Enter Playlist Details</h2>
    <div class="text-container">
      <label class="input-label" for="playlist-name">
        Playlist Name <span style="font-weight: 300;">(Optional)</span>
        <span class="tooltip">?
          <span class="tooltiptext">Enter a name for your playlist. If left empty, a relevant name will be provided.</span>
        </span>
      </label>
      <input type="text" id="playlist-name" class="text-box" placeholder="e.g., Motivation Mix" bind:value={playlistName} disabled={generated}>
    </div>
    <div class="text-container">
      <label class="input-label" for="playlist-mood">
        Playlist Mood
        <span class="tooltip">?
          <span class="tooltiptext">Enter the mood or vibe you want the playlist to reflect. This could be a specific event, feeling, aesthetic, or time of day. Examples include ‘Energetic Workout’, ‘Chill Tuesday Afternoon’, ‘Romantic Evening’, or ‘Cottagecore Picnic’.</span>
        </span>
      </label>
      <input type="text" id="playlist-mood" class="text-box" placeholder="e.g., Chill Vibes, Energetic Workout" bind:value={mood} disabled={generated}>
    </div>
    <div class="slider-container">
      <label class="input-label slider-label" for="song-count">
        Song Count
        <span class="tooltip">?
          <span class="tooltiptext">Select the number of songs you want in your playlist.</span>
        </span>
      </label>
      <div class="slider-wrapper">
        <input id="song-count" class="slider-range" type="range" min="10" max="100" bind:value={playlistNumSongs} disabled={generated}>
        <span class="slider-value">{playlistNumSongs}</span>
      </div>
    </div>
    <div class="slider-container">
      <label class="input-label slider-label" for="discovery-level">
        Discovery Level
        <span class="tooltip">?
          <span class="tooltiptext">Select the percentage of new songs in your playlist. A lower value means more songs from your library, and a higher value means more new discoveries.</span>
        </span>
      </label>
      <div class="slider-wrapper">
        <input id="discovery-level" class="slider-range" type="range" bind:value={playlistNewPercent} min="0.5" max="1" step="0.01" disabled={generated}>
        <span class="slider-value">{Math.round(playlistNewPercent * 100)}%</span>
      </div>
    </div>
    <div class="slider-container">
      <label class="input-label slider-label" for="genre-variety">
        Genre Variety
        <span class="tooltip">?
          <span class="tooltiptext">Choose how many different genres you want to include in your playlist.</span>
        </span>
      </label>
      <div class="slider-wrapper">
        <input id="genre-variety" class="slider-range" type="range" bind:value={playlistNumGenres} min="1" max="5" disabled={generated}>
        <span class="slider-value">{playlistNumGenres}</span>
      </div>
    </div>
  </div>
  <div class="right-half">
    {#if !generated}
      <img src="start.jpg" alt="Click 'Generate' to create your playlist" class="placeholder-image"/>
      <div class="button" on:click={generate} on:keydown={generate} role="button" tabindex="0">
        <span>Generate</span>
        <div id="loader" class="ld ld-ring ld-spin" style="display: none"></div>
      </div>
    {:else if generating}
      <img src="start.jpg" alt="Click 'Generate' to create your playlist" class="placeholder-image"/>
      <div class="button" on:click={generate} on:keydown={generate} role="button" tabindex="0">
        <div id="loader" class="ld ld-ring ld-spin" style="display: none"></div>
      </div>
    {:else}
      <a href={playlistLink} target="_blank">
        <img src="end.jpg" alt="Click here to view your playlist" class="placeholder-image"/>
      </a>
      <a href="/playlist-generator">
        <div class="button" role="button" tabindex="0">
          <span>Generate Again</span>
          <div id="loader" class="ld ld-ring ld-spin" style="display: none"></div>
        </div>
      </a>
    {/if}
  </div>
</div>

<!-- <h1>Generate</h1>
<form action="">
  <label for="playlistName">Playlist Name</label>
  <input type="text" id="playlistName" bind:value={playlistName} disabled={generated}/>
  <label for="playlistName">Mood</label>
  <input type="text" id="playlistName" bind:value={mood} disabled={generated}/>
  {#if generated}
    <a href="/playlist-generator"><button>Generate again</button></a>
  {:else}
    <input type="submit" on:click={generate} value="Generational">
  {/if}
</form> -->
<!-- <p></p> -->