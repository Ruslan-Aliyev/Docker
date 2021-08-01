# Very good tutorial's notes

https://www.youtube.com/playlist?list=PL1LQwTE3lBhSnaL7j90AUJyvC9mFCKhZm

## Tutorial 1 - Install Laravel from a composer container

### Basic

1. Getting composer image (https://hub.docker.com/_/composer) - most simple: `docker run composer`
2. Delete containwr when no longer needed: `docker run --rm composer`
3. Map volume: `docker run --rm -v $(pwd):/app composer`
4. Set the working directory in the container: `docker run --rm -v $(pwd):/app -w /app composer` . Any commands you pass into the container will be run from the `/app` directory.
5. Install Laravel: `docker run --rm -v $(pwd):/app -w /app composer composer create-project laravel/laravel composer4laravel`
6. Use your user instead of `root`: `docker run -u $(UID):$(UID) --rm -v $(pwd):/app -w /app composer composer create-project laravel/laravel composer4laravel`

This is slow because composer is downloading each dependency from scratch, in this newly created filesystem, without cache.

### Fast

https://hub.docker.com/r/clevyr/prestissimo install Composer dependencies in parallel

1. Install `prestissimo`: `docker pull clevyr/prestissimo`
2. Install the whole thing: `docker run -u $(UID):$(UID) --rm -v $(pwd):/app -w /app clevyr/prestissimo composer create-project laravel/laravel composer4laravel`

### Faster

Map composer container's cache to our localhost's cache.

As seen in https://github.com/composer/docker/blob/master/1.10/Dockerfile#L40 , the composer container's cache is `/tmp`

1. Map volume: `docker run -u $(UID):$(UID) -v $HOME/.cache/composer:/tmp --rm -v $(pwd):/app -w /app clevyr/prestissimo composer create-project laravel/laravel composer4laravel`

### Other Links

- Laravel documentation: https://laravel.com/docs/7.x/deployment#nginx
- Docker documentation: https://docs.docker.com/
- Composer: https://getcomposer.org/
- PHP official Docker Image: https://hub.docker.com/_/php
- Nginx official Docker Image: https://hub.docker.com/_/nginx
- MySQL official Docker Image: https://hub.docker.com/_/mysql
- Redis official Docker Image: https://hub.docker.com/_/redis

## Tutorial 2 - Locally, with `docker-compose`

https://github.com/tonysm/dockerforlaravel-app

Dockerfile explained

```
FROM php:7.4-fpm 
```
- https://hub.docker.com/_/php , fpm flavor
- https://stackoverflow.com/questions/54270656/difference-between-apache-vs-fpm-in-php-docker-image/54270756

```
RUN apt-get update \
  && apt-get install --quiet --yes --no-install-recommends \ 
    libzip-dev \
    unzip \
  && docker-php-ext-install zip \     
```
- Install composer's dependencies.
- `--quite` means not verbose. `--yes` means answer yes for everything during installation. `--no-install-recommends` means not installing recommended dependencies.

```
RUN apt-get update \
  && apt-get install --quiet --yes --no-install-recommends \
    libzip-dev \
    unzip \
  && docker-php-ext-install pcntl zip pdo pdo_mysql \
  && pecl install -o -f redis-5.1.1 \
  && docker-php-ext-enable redis
```
- Also install DB drivers
- Install Redis (has to be via pecl)
  - Use the php image's `docker-php-ext-enable` helper to enable the Redis dependency. 
    - `docker-php-ext-install` installs and enables, but pecl only installs without enabling.

- Install composer using a multi-stage image. Copy this binary: `/usr/bin/composer` from this composer image: https://hub.docker.com/_/composer to this place in our container: `/usr/bin/`
- https://dev.to/jonesrussell/install-composer-in-custom-docker-image-3f71

```
RUN groupadd --gid 1000 appuser \
  && useradd --uid 1000 -g appuser \
     -G www-data,root --shell /bin/bash \
     --create-home appuser

USER appuser
```
- For comparison - This is how you would normally create a new user: `useradd appuser -m -c "comment" -G sudo -s /bin/bash` 
  - `-c` for comment, `-m` to create user's home directory and `-s /bin/bash` to define user's shell.

- Make `UID` and `GID` more dynamic: 
  - If building the image directly: `docker build --build-arg UID=$(id -u) --build-arg GID=$(id -g) -t <IMAGE NAME> .` 
    ```
    RUN groupadd --gid ${GID} appuser \
      && useradd --uid ${UID} -g appuser \
         -G www-data,root --shell /bin/bash \
         --create-home appuser
    ```
    - https://faun.pub/set-current-host-user-for-docker-container-4e521cef9ffc 
      - https://medium0.com/m/global-identity?redirectUrl=https%3A%2F%2Ffaun.pub%2Fset-current-host-user-for-docker-container-4e521cef9ffc
  - If via docker-compose: `UID=${UID} GID=${GID} docker-compose up`
    ```
    services:
      servicename:
        image: startingimage
        user: "${UID}:${GID}"
    ```
    - https://stackoverflow.com/questions/56844746/how-to-set-uid-and-gid-in-docker-compose  
