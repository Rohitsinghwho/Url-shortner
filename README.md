# URL SHORTNER FULL STACK WEB PROJECT

## TABLE OF CONTENT
1. [Introduction](#introduction)
2. [Features](#features)

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
-   Othe tools  :  Redis, Docker, Babel, git, vite, axios.


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

Docker is a tool which helps us in isolating our application 








<br>
<br>
<br>
<br>
<div align="center">
    ** 🔥🚗 URL Shortener| Built with ❤️ using Docker + Nodejs + Postgre + Redis 🚀 **

</div>