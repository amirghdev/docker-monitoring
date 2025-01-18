## Description

I am aware that tools like Portainer exist for managing Docker containers. However, I needed a custom tool to monitor containers, send notifications when specific events occur, and provide a simple API for viewing logs and performing basic actions on my containers.

## Running the app

1. Copy .env.example to .env and update the variables with your configuration.
2. Start the application using Docker Compose:

```bash
docker compose up --build -d
```
