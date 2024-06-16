<script lang='ts'>
  import { nanoid } from 'nanoid';
  
  const state = nanoid();
  const scope = 'user-library-read playlist-modify-public playlist-modify-private playlist-read-private'
  const params = new URLSearchParams()
  params.append('response_type', 'code')
  params.append('client_id', 'dab5276ca4ba46f4b634a28ef8965e5a')
  params.append('redirect_uri', 'https://elektr1x.github.io/playlist-generator/generate')
  // params.append('redirect_uri', 'http://localhost:5173/playlist-generator/generate')
  params.append('state', state)
  params.append('scope', scope)

  const url = 'https://accounts.spotify.com/authorize?' + params.toString()
</script>

<div class="body">
  <div class="wrapper">
    <header class="main-header">
      <img src="logo.jpg" alt="Spotiflow Logo" class="logo">
      <h1>Spotiflow</h1>
    </header>
    <div class="content-container">
      <p class="app-description">
        Spotiflow is a playlist generator for Spotify that uses AI to craft personalized music recommendations based on your specific mood. Whether you're looking to unwind, get energized, or set the perfect atmosphere for an event, our AI-driven tool analyzes your preferences and curates a playlist that perfectly matches your desired vibe. Discover new music seamlessly blended with your favourite tracks, tailored just for you.
      </p>
      <a href={url}><button class="button">Connect Your Account</button></a>
    </div>
  </div>
</div>

<style>
.body {
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  background: var(--white);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  margin: 0;
  padding: 0;
}

.main-header {
  padding: 0;
  background: var(--white);
  box-shadow: none;
  margin: 0;
  width: 100%;
}

.main-header .logo {
  height: 8rem;
  margin-right: 1rem;
}

.main-header h1 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  font-size: 4rem;
  margin: 0;
  color: #000;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  max-width: 80%;
  margin-top: 0;
}

.app-description {
  font-family: 'Open Sans';
  font-size: 1.25rem;
  line-height: 2.3rem;
  color: #333;
  margin-bottom: 3rem;
}

.button {
  position: static;
  transform: none;
}

.button:hover {
  transform: none;
}
</style>