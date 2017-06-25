# API Poller

Longpoll an API and log responses to disk

## Setup

```
npm install
npm run buildOnce
```

for continous builds use

```
npm run build
```

## Configuration

Create a config.json according to following scheme:

```json
{
  "host": "",
  "port": 0,
  "paths": [
    "/a", "/b"
  ],
  "resultsFolder": ""
}
```

## Run

```
npm run start <path to config.json> <duration in seconds>
```