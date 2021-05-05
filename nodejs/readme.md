
# Dockerize NodeJS App

https://www.youtube.com/watch?v=Se-IUjRQe2c

https://www.youtube.com/watch?v=gAkwW2tuIqE

```
docker build -t atabegruslan/node-test:1.0 .
docker run -d -p 5000:8080 -v ${PWD}:/app/ --name example_name atabegruslan/node-test:1.0
docker exec -it example_name bash
```

http://localhost:5000/
