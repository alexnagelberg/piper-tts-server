import express from 'express'
import { spawn } from 'node:child_process'

interface TTSRequest {
  text: string
}

const app = express()
app.use(express.json()) // Expect JSON payloads

app.get('/health', (_req, res) => {
  res.send('Ok')
})

app.post('/tts', (req, res) => {
  if (req.body?.text == null) {
    res.status(400).send('Invalid request')
    return
  }
  const command = `/venv/bin/python3 -m piper -m /app/alex.onnx -f /pass1.wav --volume 1 && \
      sox /app/tone_440hz.wav /app/pause.wav /app/callsign.wav /pass1.wav /output.wav \
      && aplay /output.wav`

  const { text } = req.body as TTSRequest

  const exec = spawn(command, { shell: true })
  exec.stdin.write(text)
  exec.stdin.end()
  exec.on('close', () => res.send('Ok'))
  exec.on('error', err => {
    console.error(err)
    res.status(500).send('TTS processing failed')
  })
})

app.listen(8080)
console.log('Listening')
