# piper-tts-server
Simple webserver for converting text to speech. This is mostly generic enough, but it's designed specifically with playing over GMRS in mind and running on a pi.

## Build
```bash
docker build -t piper-tts-server .
```

## Run
```bash
chmod +x run_container.sh
./run_container.sh
```