- https://www.youtube.com/watch?v=K6WER0oI-qs&list=PLoYCgNOIyGAAzevEST2qm2Xbe3aeLFvLc&index=3 
- https://github.com/learncodeacademy/docker-static-nginx

```
docker build -t atabegruslan/static:1.0 .
docker run -d -p 8088:80 -v ${PWD}:/www/ --name static_example_name atabegruslan/static:1.0
docker exec -it static_example_name bash
```

localhost:8088