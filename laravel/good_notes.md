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

- Copy this binary: `/usr/bin/composer` from this composer image: https://hub.docker.com/_/composer to this place in our container: `/usr/bin/`
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

Rest of the major changes:

https://github.com/Ruslan-Aliyev/Docker/blob/master/Illustrations/IMPROVE_docker_laravel_commit.pdf

## Tutorial 3 - To Production

In production
- Better not to map volumes, so the image should have everything it need within it (except some private things)
- Change build steps for dependencies
- Better to use https://hub.docker.com/_/php 's `$PHP_INI_DIR/php.ini-production`, which in turn needs OPcache for custom configs.
  - https://www.scalingphpbook.com/
  - Example OPcache: https://laravel-news.com/php-opcache-docker
  - OPcache config detailed guide: https://tideways.com/profiler/blog/fine-tune-your-opcache-configuration-to-avoid-caching-suprises
- Make custom nginx image
- Have built images pushed to DockerHub

Dockerfile explained
```
# Composer dependencies.
FROM composer AS composer-build

WORKDIR /var/www/html

COPY composer.json composer.lock /var/www/html/

RUN mkdir -p /var/www/html/database/{factories,seeds} \
  && composer install --no-dev --prefer-dist --no-scripts --no-autoloader --no-progress --ignore-platform-reqs
```
- `composer install` needs these files: `composer.json` & `composer.lock` and these folders: `database/factories/` & `database/seeds/` (because of https://github.com/Ruslan-Aliyev/Docker/blob/55e804f84ebfbfb842fb8b23c677dcfb4d33e3f4//laravel/composer.json#L39-L40)
- `--no-scripts` means don't execute those: https://github.com/Ruslan-Aliyev/Docker/blob/55e804f84ebfbfb842fb8b23c677dcfb4d33e3f4//laravel/composer.json#L50-L61
- Don't run autoload-dump neither. Only just download dependencies at this stage

```
# NPM dependencies.
FROM node:12 AS npm-build

WORKDIR /var/www/html

COPY package.json package-lock.json webpack.mix.js /var/www/html/
COPY resources /var/www/html/resources/
COPY public /var/www/html/public/

RUN npm ci
RUN npm run production
```
- `npm install` needs these files: `package.json` & `package-lock.json`. 
- Installing and compiling assets needs `webpack.mix.js`, `/resources/` & `/public/` (https://github.com/Ruslan-Aliyev/Docker/blob/55e804f84ebfbfb842fb8b23c677dcfb4d33e3f4/laravel/webpack.mix.js#L14-L15)
- If you build the docker image now, the image will be empty inside. `.dockerignore` prevented eg `/vendor`, `/node_modules` etc to be copied from local directory into docker image, and we haven't put anything else into it yet. (The above 2 stages downloaded dependencies and compiled assets all in the local directory)

```
# Actual production image.
FROM php:7.4-fpm

WORKDIR /var/www/html

RUN apt-get update \
  && apt-get install --quiet --yes --no-install-recommends \
    libzip-dev \
    unzip \
  && docker-php-ext-install pcntl opcache zip pdo pdo_mysql \
  && pecl install -o -f redis-5.1.1 \
  && docker-php-ext-enable redis
```
- Get required php extensions (same as in local, except `opcache`)

```
# Use the default production configuration
RUN mv $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini

# Override with custom opcache settings
COPY ./docker/opcache.ini $PHP_INI_DIR/conf.d/
```
- Different server settings
  - Need `opcache`

```
COPY --from=composer /usr/bin/composer /usr/bin/composer

COPY --chown=www-data --from=composer-build /var/www/html/vendor/ /var/www/html/vendor/
COPY --chown=www-data --from=npm-build /var/www/html/public/ /var/www/html/public/
COPY --chown=www-data . /var/www/html

RUN composer dump -o && composer check-platform-reqs
```
- Get Composer, copy all the files into the image, then perform composer autoload-dump
- https://nickjanetakis.com/blog/docker-tip-2-the-difference-between-copy-and-add-in-a-dockerile

This is a multi-stage dockerfile. 
- https://askinglot.com/what-is-multistage-dockerfile
- https://docs.docker.com/develop/develop-images/multistage-build/

Custom nginx docker file explained:
```
# NPM dependencies.
FROM node:12 AS npm-build

WORKDIR /var/www/html

COPY package.json package-lock.json webpack.mix.js /var/www/html/
COPY resources /var/www/html/resources/
COPY public /var/www/html/public/

RUN npm ci
RUN npm run production
```
- NPM dependencies needed here too, for eg: email

```
# Nginx production.
FROM nginx:1.17

COPY ./docker/nginx_template_prod.conf /etc/nginx/conf.d/default.conf
```
- configs for production
  - Only difference: production (which will use K8) have `fastcgi_pass 127.0.0.1:9000;` instead of `fastcgi_pass php:9000;` on local (in which `web` talks to `php` internally thru docker networks)

```
COPY --chown=www-data --from=npm-build /var/www/html/public/ /var/www/html/public/
```
- Needs the entry point (`public/index.php`)

```
COPY --chown=www-data . /var/www/html
```

Debug docker build error:  
The logs would have a hash associated with each build step.  
So you can go into the container and run commands to debug at the container's state just before error happened: `docker rum --rm -it {hash} bash`
