
# Package Laravel Project in Docker

- https://webomnizz.com/containerize-your-laravel-application-with-docker-compose/amp/

```
git clone https://github.com/Ruslan-Aliyev/Docker.git
cd Docker/laravel
docker-compose up -d
docker exec -it laraapp bash
cp .env.example .env
composer install
chmod -R 777 storage
php artisan key:generate
```

`http://localhost:8080/`

- https://www.youtube.com/watch?v=PDaGJ397Ing
- https://www.youtube.com/playlist?list=PL1LQwTE3lBhSnaL7j90AUJyvC9mFCKhZm
