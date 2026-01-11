# MarkdownV2 Parser Telegram Bot

A Telegram bot that parses **Telegram MarkdownV2-formatted messages** and converts them into **safe, ready-to-use plain text or properly escaped output**.

The bot is useful when you need to:

- Convert user-provided formatted messages into Telegram-compatible text
- Debug or preview MarkdownV2 messages before sending them via a bot
- Work with Telegram messages programmatically without formatting errors

Live demo bot:  
https://t.me/markdownparserbot

## Features

- Full **Telegram MarkdownV2 parsing**
- Works with **Telegram Bot API** and **Local Bot API**
- Supports **Polling** and **Webhook** modes
- Configuration via `.env`
- Ready-to-use **Docker Compose**
- Lightweight **Node.js** implementation

## How It Works

1. Send a **MarkdownV2-formatted message** to the bot
2. The bot parses and validates the formatting
3. The output is returned as **Telegram-safe text**, ready for sending via a bot API

This prevents common Telegram errors such as:

- `Bad Request: can't parse entities`
- Invalid escaping
- Broken MarkdownV2 syntax

## Configuration

The bot is configured using a `.env` file.

### Environment Variables

```
TOKEN=your_telegram_bot_token
LBA_URL=http://localhost:8081
DOMAIN=https://your-domain.com
HOST=0.0.0.0
PORT=3000
```

### Variable Reference

| Variable | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| TOKEN    | Telegram bot token                                                        |
| LBA_URL  | Local Bot API URL. If not provided, the official Telegram Bot API is used |
| DOMAIN   | Domain used for webhook mode                                              |
| HOST     | HTTP server host                                                          |
| PORT     | HTTP server port                                                          |

## Running the Bot

### Production Mode

```
yarn start
```

### Development Mode

Uses `nodemon` for automatic restarts:

```
yarn dev
```

## Docker

A ready-to-use `docker-compose.yml` file is included.

### Run with Docker Compose

```
docker-compose up -d
```

Make sure the `.env` file exists before starting the containers.

## Tech Stack

- Node.js
- Docker / Docker Compose

## License

MIT
