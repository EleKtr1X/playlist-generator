import OpenAI from 'openai';

export async function getSuggestions(client: OpenAI, genres: Array<string>, mood: string, num: Number) {
  let prompt = `The mood "${mood}" is best described by which ${num} of the following genres? Select exactly ${num}, no more, no less, that are within the list, and respond with the answers only, separate by spaces. ${genres}`
  const stream = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });
  let result = "";
  for await (const chunk of stream) {
    result += chunk.choices[0]?.delta?.content || "";
  }
  let suggestions = result.split(" ")
  return suggestions
}

export async function getNameDescription(client: OpenAI, genres: Array<string>, mood: string) {
  let prompt = `"Develop a playlist name that blends the mood '${mood}' with the emotional tones of genres ${genres}, ensuring that the name retains some words from the original mood. The name should reflect both the mood and the genres. Follow the format: [Creative Name]:[Up to 3 Notable Genres] ["Playlist" or "Mix"]. Avoid special characters and quotations other than a single colon and follow proper spacing and capitalization conventions. Exactly one line after, write a brief description for the playlist that is congruent with previous details.`
  const stream = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      stream: true,
  });
  let result = "";
  for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || '';
  }
  const lines = result.split("\n").filter(line => line != '')
  const playlistName = lines[0]
  const playlistDescription = lines[1]
  console.log(lines)
  return {
    playlistName,
    playlistDescription
  }
}