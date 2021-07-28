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
