# URL SHORTNER FULL STACK WEB PROJECT

## TABLE OF CONTENT
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Stucture](#project-structure)
5. [Installation](#installation)
6. [API Documentation](#api-documentation)
7. [Analytics & Cache Performance](#analytics--cache-performance)
8. [Docker Guide](#docker-guide)
    1.  [DockerFile Overview](#dockerfile-overview)
    2.  [Docker-compose](#docker-compose)
    3.  [Multi-stage build](#multi-stage-build)
9. [Testing](#testing)
    1. [Unit Testing](#unit-testing)

## Introduction 
This is a Full-Stack service which is used to convert a long URL into a short URL. The puprose of this project is to return the user with a minimal URL string which can be shared anywhere with ease.

A user can convert any long form URL into a shorter version using this service.

## Features 

-   Creates lightning fast short URL from a long URL .
-   Redirect to original URL when short URL is visited.
-   Basic Validation and Error handling.
-   Click tracking.
-   **Cache hit/miss analytics per short URL** — real-time Redis performance metrics.


## TECH STACK 
-   Programming language :  JavaScript.
-   Framework : Express.
-   FrontEnd Library :  React.js.
-   Databse :  PostgreSQL.
-   Testing :  Jest, Supertest.
-   Othe tools  :  Redis, Docker, Babel, git, vite, axios, tailwindcss.


## PROJECT STRUCTURE 
-   frontend/ - Frontend code(React Components,pages).
-   backend/ -  Backend APIs,contollers,models,routes.
-   backend/config - DB config, cache config.
-   README.md - Project documentation.

## INSTALLATION 

This project uses Docker for both frontend and backend services. Make sure you have Docker and Docker Compose installed.

## PREREQUISITES 
-   Docker Engine 20+ and Docker Compose v2+.
-   Git.
-   Node - latest.

## QUICK START (RECOMMENDED) 
```
    /** #1 Clone the repo */

    git clone https://github.com/rohitsinghwho/url-shortener.git
    cd url-shortner

```

## Evironment variable setup 

```
    cd backend
    mkdir .env
```
Inside backend .env file write these variables.

```
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=XXXXXXXX(Your Db password)
    DB_NAME=XXXXXX(Your Db name)
    BASE_URL=http://localhost:5000
    REDIS_PORT=6379
    REDIS_URL=redis://redis:6379    
```

```
    cd frontend
    mkdir .env
```

Inside frontend .env file write these variables.

```
    URL -   
```

## Docker build 

From root move:-   

    ```
    cd backend
    docker-compose build --no-cache
    ```

If build successfull then:-

    ```
    docker compose up -d (For spining all container up).
    docker compose down (For stopping all container).
    ```

Now for frontend:-
    ```
    cd frontend
    ```

-   Development build and up
    ```
    docker compose -f docker-compose.dev.yml up --build
    docker compose -f docker-compose.dev.yml up
    ```
-   Production build and up
    ```
    docker compose build
    docker compose up -d

    ```



### Hurrary 🔥 you have successfully installed the project.

## API DOCUMENTATION

- ## POST - /shorten
    -   Used to Shorten the Long Url into Shorter One.
    -   Expects a Long Url as Json Object.
    -   Returns a Short Url with message : success.

- ## GET - /:shortCode
    -   Used to Redirect a visitor to the Original Url.
    -   Expects a ShortCode as a params generted during /shorten call.
    -   Returns a WebPage associated with ShortCode.

---

## Analytics & Cache Performance

The service tracks Redis cache performance per short URL in real time. Every redirect request is instrumented — the system counts total hits, cache hits (served from Redis), and DB hits (fallback to PostgreSQL), giving you a precise picture of cache efficiency.

### How It Works

Each time a short URL is visited:

1. The total request counter is incremented.
2. If Redis serves the URL → **cache hit** counter increments (~2–5ms response).
3. If Redis misses → PostgreSQL is queried → **DB hit** counter increments (~40–80ms response), and the result is cached for subsequent requests.

This means the **first request** for any short URL always hits the DB. Every repeat request is served from Redis — significantly reducing PostgreSQL load at scale.

### Stats Endpoint

```
GET /analytics/stats/:shortCode
```

**Example Request:**
```bash
curl http://localhost:8080/analytics/stats/abc123
```

**Example Response:**
```json
{
  "shortCode": "abc123",
  "totalRequests": 500,
  "cacheHits": 423,
  "dbHits": 77,
  "cacheHitRate": "84.60%"
}
```

### What the Numbers Mean

| Field | Description |
|---|---|
| `totalRequests` | Total redirect attempts for this short code |
| `cacheHits` | Requests served directly from Redis (fast path) |
| `dbHits` | Requests that required a PostgreSQL lookup (slow path) |
| `cacheHitRate` | Percentage of requests avoided hitting the DB |

### Load Testing to Generate Real Metrics

Use [autocannon](https://github.com/mcollina/autocannon) to simulate traffic and observe cache behaviour under load:

```bash
# Install autocannon
npm install -g autocannon

# Fire 500 requests with 50 concurrent connections
autocannon -n 500 -c 50 http://localhost:8080/abc123

# Then check real cache hit rate
curl http://localhost:8080/analytics/stats/abc123
```

Under load testing, repeat requests to the same short URL consistently achieve **80–90%+ cache hit rates**, reducing PostgreSQL queries by the same margin and bringing redirect latency down from ~50ms (DB) to ~3ms (Redis cache).

### Redis TTL Policy

All cached URLs use a **30-day TTL**. Counters stored in Redis persist independently and are not affected by URL cache expiry.

---

## Docker Guide

Docker is a softwere platform that lets us run, build and deploy code with ease. Docker packages softwere into a standardrized units called [containers](https://aws.amazon.com/containers/) that have everything a softwere needs to run including libraries, system tools and runtime.

Basically docker lets us use the same configuration which is on the host machine where docker container is initialized on all the other machines running the specific docker container.

-   ## DockerFile Overview
    A DockerFile is a simple text file with no extension that acts as a blueprint for building Docker [images](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/) automatically.Docker reads its instructions line-by-line to create a layered, reproducible images container your app, [dependencies](https://askubuntu.com/questions/361741/what-are-dependencies), and [runtime environment](https://www.geeksforgeeks.org/compiler-design/runtime-environments-in-compiler-design/).

-   ## Docker-Compose
    Docker compose lets us define all of our containers and their configurations in single YAML file. If we include this in our project then anyone that clones our repository can get up and run the docker containers with a single command.

-   ## Multi-stage build
    In a traditional build, all build instructions are executed in sequence, and in a single build container: downloading dependencies, compiling code, and packaging the application. All those layers end up in your final image. This approach works, but it leads to bulky images carrying unnecessary weight and increasing your security risks. This is where multi-stage builds come in.

    Multi-stage builds introduce multiple stages in your Dockerfile, each with a specific purpose. Think of it like the ability to run different parts of a build in multiple different environments, concurrently. By separating the build environment from the final runtime environment, you can significantly reduce the image size and attack surface. This is especially beneficial for applications with large build dependencies.

## Testing

-   ### Unit Testing
    ```
    #Backend
    cd backend && npm test

    #Frontend
    cd frontend && npm test
    ```



<br>
<br>
<br>
<br>
<div align="center">
    ** 🔥🚗 URL Shortener| Built with ❤️ using Docker + Nodejs + Postgre + Redis 🚀 **

</div>