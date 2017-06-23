# Ergometer Drain

Longpoll the API and log responses to disk

## Setup

```
npm install
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
npm run start <duration>
```