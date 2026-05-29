# BIT Inventory

Inventory management application for tracking production, sales, and raw material purchases.

## Tech stack

- **Frontend:** Angular 19, NG-Zorro, Tailwind CSS
- **Backend:** Spring Boot 3.4, Java 21
- **Database:** PostgreSQL 16

## Run locally with Docker

```bash
cp .env.example .env
docker compose up --build
```

| Service  | URL                    |
|----------|------------------------|
| Frontend | http://localhost       |
| Backend  | http://localhost:8080  |
| Postgres | localhost:5432         |

The frontend nginx container proxies `/api/*` to the backend, so no CORS setup is needed for normal use.

Seed data runs automatically on first startup via the `db-seed` service.

## Deploy to Render (free tier)

1. Push the `dockerized` branch to GitHub.
2. In the [Render Dashboard](https://dashboard.render.com), click **New → Blueprint**.
3. Connect the repo and select the `dockerized` branch.
4. Render reads `render.yaml` and creates:
   - **inventory-db** – managed PostgreSQL (free, expires after 30 days)
   - **inventory-api** – Spring Boot backend (Docker)
   - **inventory-web** – Angular frontend (Docker + nginx)

> **Note:** Render's free tier does not support Docker Postgres as a private service, so production uses Render's managed PostgreSQL. Local Docker Compose runs Postgres in a container.

Free tier services spin down after inactivity; the first request after idle may take 30–50 seconds.

## Run without Docker

**Backend:**
```bash
cd inventory-be-master
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd inventory-fe-master
npm install
npm start
```

Open http://localhost:4200 (API at http://localhost:8080).
