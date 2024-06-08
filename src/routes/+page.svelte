<script lang='ts'>
  import { nanoid } from 'nanoid';
  
  const state = nanoid();
  const scope = 'user-library-read playlist-modify-public playlist-modify-private playlist-read-private'
  const params = new URLSearchParams()
  params.append('response_type', 'code')
  params.append('client_id', 'dab5276ca4ba46f4b634a28ef8965e5a')
  // params.append('redirect_uri', 'https://elektr1x.github.io/playlist-generator/generate')
  params.append('redirect_uri', 'http://localhost:5173/playlist-generator/generate')
  params.append('state', state)
  params.append('scope', scope)

  const url = 'https://accounts.spotify.com/authorize?' + params.toString()
</script>

<h1>Spotify Playlist Generator</h1>
<a href={url}><button>Log in with Spotify</button></a>