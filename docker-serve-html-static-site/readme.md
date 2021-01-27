https://www.youtube.com/watch?v=K6WER0oI-qs&list=PLoYCgNOIyGAAzevEST2qm2Xbe3aeLFvLc&index=3
https://github.com/learncodeacademy/docker-static-nginx
```
docker build -t atabegruslan/static-nginx .
docker run -d -p 8088:80 --name name_16 atabegruslan/static-nginx
```
localhost:8088
```
docker ps
docker inspect d2e982dd6182|grep "IPAddress"

docker images
docker tag 9d320f8b1963 atabegruslan/static-nginx:firsttry

docker login
docker push atabegruslan/static-nginx
```