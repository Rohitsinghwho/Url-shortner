# URL SHORTNER FULL STACK WEB PROJECT

## TABLE OF CONTENT
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Stucture](#project-structure)
5. [Installation](#installation)
6. [API Documentation](#api-documentation)
7. [Docker Guide](#docker-guide)
    1.  [DockerFile Overview](#dockerfile-overview)
    2.  [Docker-compose](#docker-compose)
    3.  [Multi-stage build](#multi-stage-build)
8. [Testing](#testing)
    1. [Unit Testing](#unit-testing)

## Introduction 
This is a Full-Stack service which is used to convert a long URL into a short URL. The puprose of this project is to return the user with a minimal URL string which can be shared anywhere with ease.

A user can convert any long form URL into a shorter version using this service.

## Features 

-   Creates lightning fast short URL from a long URL .
-   Redirect to original URL when short URL is visited.
-   Basic Validation and Error handling.
-   Click tracking.


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
    docker-compose build --no-cache
```

If build successfull then:-
```
    docker compose up -d
    docker compose down
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