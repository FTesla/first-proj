# First Demo: Spring Boot + Angular + Docker

Учебный проект: backend на Spring Boot (Java 21) и frontend на Angular (canvas/симуляция).
Деплой: сборка образов локально → перенос на VPS → запуск через Docker Compose.

## Стек
- Java 21, Spring Boot
- Angular
- Docker / Docker Compose
- nginx (статика + прокси `/api`)

## Локальный запуск (через Docker)
```bash
docker compose up -d
```

Frontend:
http://localhost:4200/

API:
http://localhost:4200/api/hello