
# PROJECT TITLE :-
# URL SHORTNER FULL STACK WEB PROJECT


## DESCRIPTION :-
This is a Full-Stack service which is used to convert a long URL into a short URL. The puprose of this project is to return the user with a minimal URL string which can be shared anywhere with ease.

A user can convert any long form URL into a shorter version using this service.

## FEATURES :-

-   Creates a short URL from a long URL.
-   Redirect to original URL when short URL is visited.
-   Basic Validation and Error handling.
-   Click tracking.


## TECH STACK :-
-   Programming language :  JavaScript.
-   Framework : Express.
-   FrontEnd Library :  React.js.
-   Databse :  PostgreSQL.
-   Testing :  Jest, Supertest.
-   Othe tools  :  Redis, Docker, Babel, git.


## PROJECT STRUCTURE :-
-   frontend/ - Frontend code(React Components,pages).
-   backend/ -  Backend APIs,contollers,models,routes.
-   backend/config - DB config, cache config.
-   README.md - Project documentation.

## INSTALLATION :-

This project uses Docker for both frontend and backend services. Make sure you have Docker and Docker Compose installed.

## PREREQUISITES :-
-   Docker Engine 20+ and Docker Compose v2+.
-   Git.
-   Node - latest.

## QUICK START (RECOMMENDED)
```
    /** #1 Clone the repo */

    git clone https://github.com/rohitsinghwho/url-shortener.git
    cd url-shortner

```

## Evironemt variable setup :-

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


<div align="center">
    **🔥🚗 URL Shortener** | Built with ❤️ using Docker + Nodejs + Postgre + Redis 🚀**

</div>