FROM node:24

RUN mkdir /app
WORKDIR /app

RUN apt update
RUN apt install -y python3 python3-venv python3-pip alsa-utils sox

# piper setup
RUN python3 -m venv /venv
RUN /venv/bin/pip install piper-tts==1.4.1
RUN /venv/bin/pip install pathvalidate
#RUN /venv/bin/python3 -m piper.download_voices en_US-lessac-medium

# Misc sound file setup
COPY alex.onnx* /app
COPY tone_440hz.wav /app/tone_440hz.wav
COPY callsign.wav /app/callsign.wav
COPY pause.wav /app/pause.wav

# alsa setup
COPY asound.conf /etc/asound.conf

# server setup
COPY package*.json /app
COPY tsconfig*.json /app
COPY src /app/src
RUN npm install
RUN npm run build

COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]
