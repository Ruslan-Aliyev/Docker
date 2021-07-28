# Install WP Project with Docker

- Official Tutorial https://docs.docker.com/compose/wordpress/
- Simplest Example https://upcloud.com/community/tutorials/wordpress-with-docker/
- Simple Example https://www.hostinger.vn/huong-dan/lam-the-nao-de-cai-wordpress-tren-docker/
- Complex Example https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-docker-compose

```
git clone https://github.com/Ruslan-Aliyev/Docker.git
cd Docker/wordpress
docker-compose up -d --build
cp wp-config-sample.php wp-config.php
```

`http://localhost:8080/wp-admin/install.php`

## With Database Import

`database.sh`
```
docker exec -it wp_docker_db bash   
mysql -u admin -p12345 wpapp_db < db.sql
```

- https://developer.ibm.com/tutorials/docker-dev-db/
- https://adithya.dev/docker-secrets-with-mysql-in-docker-compose/

### Admin Credentials

If you can't login to http://localhost:8080/wp-admin , because for whatever reason the default credentials don't work:

Go into the database via Navicat > `wpapp_db` database > `wp_users` table.

Enable `Raw Mode` from the `View` menu.

Overwrite the `user_pass` field with `MD5('123456')`

Apply changes by clicking the little tick button on the bottom bar.
