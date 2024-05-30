import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 4096;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// app.use(express.static(__dirname, '/resources'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'resources', 'index.html'))
})

app.get('/generate', (req, res) => {
  res.sendFile(path.join(__dirname, 'resources', 'generate.html'))
})

app.listen(port, () => console.log(`App online @ port ${port}`))