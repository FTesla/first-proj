# First Demo: Spring Boot + Angular + Docker

Тестовый проект: backend на Spring Boot и frontend на Angular (canvas/симуляция), деплой через Docker.

## Стек
- Java 21, Spring Boot
- Angular
- Docker / Docker Compose
- nginx (раздача фронта + прокси /api)

## Локальный запуск
### Frontend
```bash
cd frontend
npm ci
npm run build

## Открыть:
http://localhost/