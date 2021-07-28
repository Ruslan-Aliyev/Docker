
# Package Laravel Project in Docker

- https://webomnizz.com/containerize-your-laravel-application-with-docker-compose/amp/

```
git clone https://github.com/Ruslan-Aliyev/Docker.git
cd Docker/laravel
docker-compose up -d --build
docker exec -it laraapp bash
cp .env.example .env
composer install
chmod -R 777 storage
php artisan key:generate
```

`http://localhost:8080/`

- https://www.youtube.com/watch?v=PDaGJ397Ing
- https://www.youtube.com/playlist?list=PL1LQwTE3lBhSnaL7j90AUJyvC9mFCKhZm <sup>Very Good</sup>
- https://www.youtube.com/watch?v=2exXt7XLPBQ
- https://www.youtube.com/watch?v=Ip2btxIUdNw
- LaraDock: 
	- https://www.youtube.com/playlist?list=PLWvvi-jFYHUjfMprLCYA1ubflsirxKrVg
	- https://github.com/LaraDock/

# Sail

- https://www.youtube.com/watch?v=5VxLX3aVs-E
- https://www.youtube.com/watch?v=4K4nkncZ2OQ
- https://laravel.com/docs/8.x/sail#installing-sail-into-existing-applications
- https://laravel.com/docs/8.x/installation#getting-started-on-macos
- https://www.youtube.com/watch?v=398J2rNQRGY
